import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Button from '../Button';
import { formatUserJournal } from '../../lib/notebooks.js';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import Image from 'next/image';
import WritingGameComponent from '../WritingGameComponent';
import Spinner from '../Spinner';
import AnkyJournalsAbi from '../../lib/journalsABI.json'; // Assuming you have the ABI
import { useUser } from '../../context/userContext';

function transformJournalType(index) {
  switch (index) {
    case 0:
      return 8;
    case 1:
      return 32;
    case 2:
      return 64;
  }
}

const JournalById = ({ setLifeBarLength, lifeBarLength }) => {
  const router = useRouter();
  const { userAppInformation } = useUser();
  const [journal, setJournal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(0);
  const [text, setText] = useState('');
  const [uploadingWriting, setUploadingWriting] = useState(false);
  const [provider, setProvider] = useState(null);
  const [entryForDisplay, setEntryForDisplay] = useState(null);
  const [chosenPrompt, setChosenPrompt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadWritingGame, setLoadWritingGame] = useState(false);
  const [writingForDisplay, setWritingForDisplay] = useState(null);
  const [writingGameProps, setWritingGameProps] = useState(null);
  const [whoIsWriting, setWhoIsWriting] = useState('');
  const { wallets } = useWallets();

  const thisWallet = wallets[0];

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEntryForDisplay(null);
  }, []);

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    async function fetchJournal() {
      try {
        const userJournals = userAppInformation.userJournals;
        console.log(router.query);
        const thisJournal = userJournals.filter(
          x => x.journalId === router.query.id
        );
        console.log('sajl', thisJournal);
        if (thisJournal.length > 0) {
          setJournal(thisJournal[0]);
          setLoading(false);
        } else {
          throw Error('No notebook found');
          alert('eeerrroooooor');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchJournal();
  }, [thisWallet]);

  const writeOnJournal = async () => {
    const pagesWritten = journal.entries.length;
    console.log('the pages written are:', pagesWritten);
    if (pagesWritten >= transformJournalType(journal.journalType)) {
      alert('All pages have been written!');
      return;
    }
    const writingGameParameters = {
      notebookType: 'journal',
      targetTime: 480,
      backgroundImage: null, // You can modify this if you have an image.
      prompt: 'write as if the world was going to end', // You need to fetch and set the correct prompt.
      musicUrl: 'https://www.youtube.com/watch?v=HcKBDY64UN8',
      onFinish: updateJournalWithPage,
    };

    setWritingGameProps(writingGameParameters);
    setLoadWritingGame(true);
  };

  const updateJournalWithPage = async finishText => {
    try {
      console.log('inside the update journal with page function');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/notebooks/upload-writing`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: finishText }),
        }
      );

      const { cid } = await response.json();
      console.log('the cid is: ', cid);
      let signer = await provider.getSigner();
      const journalsContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_JOURNALS_CONTRACT_ADDRESS,
        AnkyJournalsAbi,
        signer
      );
      console.log('the journals contract is: ', journalsContract);

      const pageNumber = journal.entries.length;
      console.log('the page number is', pageNumber);
      console.log('the notebook is: ', journal);
      const journalId = router.query.id;
      console.log('the journal id is: ', journalId, cid);
      const tx = await journalsContract.writeJournal(journalId, cid, false);
      await tx.wait();
      console.log('after the response of writing in the journal', journal);
      setJournal(x => {
        return {
          ...x,
          entries: [
            ...journal.entries,
            {
              cid: cid,
              isPublic: false,
              text: finishText,
              timestamp: new Date().getTime(),
            },
          ],
        };
      });
      setLifeBarLength(0);
      setLoadWritingGame(false);
      console.log('after the setloadwrtinggame put into false');
    } catch (error) {
      console.error('Failed to write to notebook:', error);
    }
  };

  function renderModal() {
    return (
      isModalOpen && (
        <div className='fixed top-0 left-0 bg-black w-full h-full flex items-center justify-center z-50'>
          <div className='bg-purple-300 overflow-y-scroll text-black rounded relative p-6 w-2/3 h-2/3'>
            <p
              onClick={closeModal}
              className='absolute top-1 cursor-pointer right-2 text-red-600'
            >
              close
            </p>
            {entryForDisplay.text.split('\n').map((x, i) => {
              return (
                <p key={i} className='my-2'>
                  {x}
                </p>
              );
            })}
          </div>
        </div>
      )
    );
  }

  if (loading)
    return (
      <div>
        <Spinner />
        <p className='text-white'>loading...</p>
      </div>
    );

  if (loadWritingGame)
    return (
      <WritingGameComponent
        {...writingGameProps}
        text={text}
        setLifeBarLength={setLifeBarLength}
        lifeBarLength={lifeBarLength}
        setText={setText}
        time={time}
        setTime={setTime}
        cancel={() => setLoadWritingGame(false)}
      />
    );
  return (
    <div className='text-white pt-4'>
      <h2 className='text-2xl mb-4'>This is journal {journal.journalId}</h2>
      {journal.entries.length !== 0 ? (
        <div className='p-4 flex rounded-xl bg-yellow-500'>
          {journal.entries.map((x, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setIsModalOpen(true);
                  setEntryForDisplay(x);
                }}
                className='px-2  py-1 m-1 w-8 h-8 flex justify-center items-center hover:bg-blue-600 cursor-pointer bg-blue-400 rounded-xl'
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>you haven&apos;t written here yet</p>
        </div>
      )}
      {journal.pagesLeft === 0 ? (
        <p className='text-4xl p-4 bg-red-400 rounded-xl hover:bg-red-600 hover:cursor-not-allowed my-4'>
          you wrote it all
        </p>
      ) : (
        <button
          onClick={writeOnJournal}
          className='text-4xl p-4 bg-red-400 rounded-xl hover:bg-red-600 my-4'
        >
          write journal
        </button>
      )}

      <div className='flex space-x-2'>
        <Button
          buttonText='buy new journal'
          buttonColor='bg-purple-600'
          buttonAction={() => router.push('/journal/new')}
        />
        <Button
          buttonText='back to my journals'
          buttonColor='bg-green-600'
          buttonAction={() => router.push('/journal')}
        />
      </div>
      {renderModal()}
    </div>
  );
};

export default JournalById;
