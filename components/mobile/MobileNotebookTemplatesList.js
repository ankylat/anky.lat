import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import AnkyTemplatesAbi from '../../lib/templatesABI.json';
import NotebooksAbi from '../../lib/notebookABI.json'; // Assuming you have this
import { processFetchedTemplate } from '../../lib/notebooks.js';
import { useRouter } from 'next/router';
import Button from '../Button';
import MobileNotebookCard from '../MobileNotebookCard';
import Link from 'next/link';
import Spinner from '../Spinner';

function loadExampleToState(example) {
  setTitle(example.title);
  setDescription(example.description);
  setPrice(example.price);
  setPrompts(example.prompts);
}

const EXAMPLE_NOTEBOOKS = [
  {
    title: 'Journey of Self',
    description:
      'Dive deep into the realms of self-awareness and understanding. Let this notebook guide you on a voyage of introspection and self-discovery.',
    price: 0.01,
    prompts: [
      'What does self-awareness mean to you?',
      'Describe a moment when you felt most connected to yourself.',
      'How has your perception of self changed over the years?',
      // ... Add more prompts as needed
    ],
  },
];

function MobileNotebookTemplatesList() {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(null);
  const [displayInfo, setDisplayInfo] = useState(false);
  const { wallets } = useWallets();

  const thisWallet = wallets[0];

  const setExampleNotebook = notebook => {
    setTitle(notebook.title);
    setDescription(notebook.description);
    setPrice(notebook.price);
    setPrompts(notebook.prompts);
  };

  useEffect(() => {
    async function fetchTemplates() {
      if (!thisWallet) return;

      let fetchedProvider = await thisWallet.getEthersProvider();
      setProvider(fetchedProvider);
      let signer = await fetchedProvider.getSigner();

      const templatesContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_TEMPLATES_CONTRACT_ADDRESS,
        AnkyTemplatesAbi,
        signer
      );
      const templateCount = await templatesContract.templateCount();

      const fetchedTemplates = [];

      for (let i = 0; i < templateCount; i++) {
        const template = await templatesContract.getTemplate(i);

        if (template) {
          const formattedTemplate = await processFetchedTemplate(template);
          console.log('The formatter template is: ', formattedTemplate);
          fetchedTemplates.push(formattedTemplate);
        }
      }
      setTemplates(fetchedTemplates);
      setLoading(false);
    }

    fetchTemplates();
  }, [thisWallet]);

  if (!templates) return <p>There are no templates</p>;
  if (loading)
    return (
      <div>
        <Spinner />
        <p className='text-white'>Loading the templates...</p>
      </div>
    );

  return (
    <div className='flex flex-col px-2'>
      <h2 className='text-black text-center text-4xl my-2 '>Notebooks</h2>
      <p className='text-black'>
        A notebook is a blueprint that other people can mint to write inside it.
      </p>
      <p className='text-black'>
        It is a pathway that someone designed for you to navigate yourself.
      </p>
      <div className='flex flex-wrap my-4'>
        {templates.map((template, index) => (
          <TemplateItem
            key={index}
            template={template}
            provider={provider}
            thisWallet={thisWallet}
          />
        ))}
      </div>
      <div className='flex  justify-center'>
        <Button
          buttonText='back'
          buttonColor='bg-purple-600'
          buttonAction={() => router.back()}
        />
      </div>
    </div>
  );
}

function TemplateItem({ template, provider, thisWallet }) {
  const router = useRouter();
  const handleMint = async () => {
    if (!thisWallet || !provider) return;
    console.log('before the badsiajlds', thisWallet);
    const signer = await provider.getSigner();
    const notebooksContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NOTEBOOKS_CONTRACT,
      NotebooksAbi,
      signer
    );
    const amountToMint = 1; // Change this value if you want to mint a different amount

    const requiredEther = ethers.utils.parseEther(
      (template.price * amountToMint).toString()
    );

    console.log('the required ethere is: ', requiredEther);

    try {
      // Check if all arguments are correctly populated
      const balance = await provider.getBalance(thisWallet.address);
      console.log('The wallets balance is: ', balance);

      console.log('the template is: ', template);
      console.log(
        'Minting Params:',
        thisWallet.address,
        template.templateId,
        amountToMint,
        requiredEther
      );

      const tx = await notebooksContract.mintNotebook(
        thisWallet.address, // address of the person minting the notebook
        1, // ID of the template being minted
        amountToMint, // how many notebooks you want to mint
        {
          value: requiredEther,
        }
      );
      await tx.wait();
      alert('Minting completed!');
    } catch (error) {
      console.error('Error minting:', error);
      alert('Minting failed. Please try again.');
    }
  };

  return <MobileNotebookCard handleMint={handleMint} thisNotebook={template} />;
}

export default MobileNotebookTemplatesList;