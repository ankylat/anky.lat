import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Button from './Button';
import Link from 'next/link';
import notebookContractABI from '../lib/notebookABI.json';
import { setUserData } from '../lib/idbHelper';
import { useUser } from '../context/UserContext';
import { newProcessFetchedNotebook } from '../lib/notebooks.js';
import Spinner from './Spinner';
import { usePrivy, useWallets } from '@privy-io/react-auth';

function NotebookPage({ router, wallet }) {
  const { authenticated, login } = usePrivy();
  const [notebookData, setNotebookData] = useState(null);
  const [loadingNotebook, setLoadingNotebook] = useState(true);
  const [mintingNotebook, setMintingNotebook] = useState(false);
  const [doesntExist, setDoesntExist] = useState(false);
  const [mintedNotebookId, setMintedNotebookId] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [mintedNotebookSuccess, setMintedNotebookSuccess] = useState(false);
  const [notebookInformation, setNotebookInformation] = useState({});
  const { setUserAppInformation } = useUser();

  const { id } = router.query;
  useEffect(() => {
    if (id && wallet) fetchNotebookData(id);
    else {
      if (id) {
        fetchNotebookFromServer();
      }
    }
    async function fetchNotebookFromServer() {
      const serverResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/notebooks/template/${id}`
      );
      const data = await serverResponse.json();
      console.log('the server response is: ', data);
      setNotebookData(data.template);
      setLoadingNotebook(false);
    }
  }, [id]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(`https://www.anky.lat/template/${id}`);
    setLinkCopied(true);
  };

  async function fetchNotebookData(notebookId) {
    if (!wallet) return;
    let provider = await wallet.getEthersProvider();
    let signer;

    if (provider) {
      signer = await provider.getSigner();
    } else {
      return;
    }

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NOTEBOOKS_CONTRACT,
      notebookContractABI,
      signer
    );

    console.log(
      'right before calling the smart contrwact to get the notebook',
      contract
    );
    console.log(
      'the provider that is calling is: ',
      provider,
      wallet,
      notebookId
    );

    const data = await contract.getNotebook(notebookId);
    console.log('in here, the dataof this notebook is is: 0, ', data);
    if (data.metadataCID.length < 3) return setDoesntExist(true);
    const processedData = await newProcessFetchedNotebook(data);
    console.log('the data is:', processedData);
    setNotebookData(processedData);
    setLoadingNotebook(false);
  }

  async function handleMint() {
    setMintingNotebook(true);
    try {
      if (!wallet) return alert('You need to login first');
      let provider = await wallet.getEthersProvider();
      let signer = await provider.getSigner();

      const notebooksContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_NOTEBOOKS_CONTRACT,
        notebookContractABI,
        signer
      );

      const amount = 1;
      const priceInWei = ethers.utils.parseEther(notebookData.price);

      const transaction = await notebooksContract.mintNotebook(
        notebookData.notebookId,
        amount,
        'aloja', // this value is not needed anymore because there are no password strings.
        { value: priceInWei }
      );

      const transactionResponse = await transaction.wait();
      console.log('The transaction response is: ', transactionResponse);
      const mintedEvents = transactionResponse.events.filter(
        event => event.event === 'NotebookMinted'
      );
      const notebookIds = mintedEvents.map(event => event.args.instanceId);
      console.log(notebookIds);
      console.log('mint of the notebook was successful');

      const transferredEvents = transactionResponse.events.filter(
        event => event.event === 'FundsTransferred'
      );
      const transferredAmounts = transferredEvents.map(
        event => event.args.amount
      );
      console.log(transferredAmounts);

      const notebookId = mintedEvents[0].args.instanceId;
      const creatorAmount = ethers.utils.formatEther(transferredAmounts[0]);
      const userAmount = ethers.utils.formatEther(transferredAmounts[1]);

      setMintedNotebookId(notebookId);
      setMintedNotebookSuccess(true);
      setMintingNotebook(false);
      let newNotebooksArray;
      setNotebookInformation({ creatorAmount, userAmount, notebookId });
      setUserAppInformation(x => {
        newNotebooksArray = [
          ...x.userNotebooks,
          { notebookId: notebookId, userPages: [], template: templateData },
        ];
        return {
          ...x,
          userNotebooks: newNotebooksArray,
        };
      });
      setUserData('userNotebooks', newNotebooksArray);
    } catch (error) {
      setMintingNotebook(false);
      console.error('Error during minting: ', error.message);
      alert(error.message);
    }
  }

  if (loadingNotebook)
    return (
      <div>
        <Spinner />
        <p className='text-white'>loading</p>
      </div>
    );

  if (doesntExist) {
    return (
      <div className='text-white'>
        <p>this notebook doesnt exist.</p>
        <Link href='/notebooks/new' passHref>
          <Button buttonText='create it' buttonColor='bg-green-500' />
        </Link>
      </div>
    );
  }

  return (
    <div className='md:w-1/2 p-2 mx-auto w-screen text-white pt-5'>
      {notebookData ? (
        <>
          {mintedNotebookSuccess ? (
            <>
              <h2 className=' mb-3'>
                congratulations, you minted the following notebook:
              </h2>
              <h2 className='text-3xl mb-3'>
                {templateData.metadata.title || 'undefined'}
              </h2>

              <p>
                {notebookInformation.creatorAmount} eth was transferred to the
                notebook creator as royalties.
              </p>
              <p>
                {notebookInformation.userAmount} eth was returned to you as
                in-app credits.
              </p>
              <p>the rest goes to the dao that makes this place exist.</p>
              <div className='w-fit mx-auto mt-2'>
                <Button
                  buttonColor='bg-purple-600'
                  buttonText='write on it'
                  buttonAction={() =>
                    router.push(`/notebook/${mintedNotebookId}`)
                  }
                />
              </div>
            </>
          ) : (
            <>
              <h2 className='text-3xl mb-3'>
                {notebookData.metadata.title || 'undefined'}{' '}
              </h2>

              <p className='italic text-lg mb-3'>
                {notebookData.metadata.description || 'undefined'}
              </p>
              <small className='text-sm'>
                this is notebook is closed. solid. in order to write on it and
                access its magic, you need to buy it for the price that the
                creator determined.
              </small>
              <ol className='text-left text-black p-4 bg-slate-200 rounded-xl  my-4'>
                {notebookData.metadata.prompts.map((x, i) => (
                  <li key={i}>
                    {i + 1}. {x}
                  </li>
                ))}
              </ol>
              <div className='flex justify-center'>
                <p className='bg-green-600 p-2 text-white rounded-xl border my-2 border-black w-fit mx-2'>
                  {notebookData.supply} units left
                </p>
                <p className='bg-green-600 p-2 text-white rounded-xl border my-2 border-black w-fit mx-2'>
                  {notebookData.price} eth
                </p>
              </div>

              <p>
                70% of what you pay will go back to your wallet as credits for
                using here.
              </p>
              <p>10% of it will go to who created the template as royalties.</p>
              <div className='w-96 mx-auto  text-white flex items-start justify-center my-4'>
                {authenticated ? (
                  <div className='flex justify-center space-x-2'>
                    <Button
                      buttonColor='bg-green-600 mx-2'
                      buttonText={mintingNotebook ? `buying...` : `buy`}
                      buttonAction={handleMint}
                    />
                    <Button
                      buttonColor='bg-blue-400 mx-2'
                      buttonText={linkCopied ? `copied` : `copy link`}
                      buttonAction={copyToClipboard}
                    />
                    <Link href='/library' passHref>
                      <Button
                        buttonColor='bg-purple-600 mx-2'
                        buttonText='library'
                      />
                    </Link>
                  </div>
                ) : (
                  <div className='flex flex-col space-y-2'>
                    <Button
                      buttonColor='bg-purple-400'
                      buttonText='login to mint'
                      buttonAction={login}
                    />
                    <small className='text-white text-sm'>
                      (its all on base goerli for now)
                    </small>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default NotebookPage;