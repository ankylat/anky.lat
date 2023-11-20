import React, { useEffect, useState } from 'react';
import { getThisUserWritings } from '../lib/irys';
import { usePrivy } from '@privy-io/react-auth';
import Button from './Button';
import Link from 'next/link';
import Spinner from './Spinner';

var options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
};

const UserFeed = ({ thisWallet, exportWallet }) => {
  const { login } = usePrivy();
  const [userWritings, setUserWritings] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  useEffect(() => {
    const fetchUserWritings = async () => {
      if (!thisWallet) return;
      const thisUserWritings = await getThisUserWritings(thisWallet.address);
      setUserWritings(thisUserWritings);
      setLoadingFeed(false);
    };
    fetchUserWritings();
  }, [thisWallet]);
  if (!thisWallet)
    return (
      <div>
        <p className='text-white mt-2'>
          please{' '}
          <span
            className='hover:text-yellow-300 cursor-pointer'
            onClick={login}
          >
            login
          </span>{' '}
          first
        </p>
      </div>
    );

  if (loadingFeed) {
    return (
      <div className='mt-12'>
        <p className='text-white'>loading...</p>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='w-full'>
        <p className='text-white text-2xl'>Your feed:</p>
        <h2 className='text-white'>{thisWallet.address}</h2>
        <div className='mx-auto w-24'>
          <Link href='/library'>
            <Button buttonColor='bg-green-400' buttonText='library' />
          </Link>
        </div>
      </div>
      <div className='w-full px-4 md:w-1/2 mx-auto'>
        {userWritings.map((x, i) => {
          return <UserWriting key={x.cid} writing={x} />;
        })}
      </div>
      {userWritings && userWritings.length > 0 && (
        <Link href='/library'>
          <Button buttonColor='bg-green-400' buttonText='library' />
        </Link>
      )}
    </div>
  );
};

const UserWriting = ({ writing }) => {
  function getColor(containerType) {
    switch (containerType) {
      case 'journal':
        return 'bg-green-400 hover:bg-green-500';
      case 'dementor':
        return 'bg-red-400 hover:bg-red-500';
      case 'eulogia':
        return 'bg-orange-400 hover:bg-orange-500';
      case 'notebook':
        return 'bg-blue-400 hover:bg-blue-500';
      default:
        return 'bg-black';
    }
  }

  function getContainerLink(writing) {
    switch (writing.writingContainerType) {
      case 'journal':
        return `/journal/${writing.containerId}`;
      case 'dementor':
        return `/dementor/${writing.containerId}`;
      case 'eulogia':
        return `/eulogia/${writing.containerId}`;
      case 'notebook':
        return `/notebook/${writing.containerId}`;
      default:
        return '/community-notebook';
    }
  }

  return (
    <Link href={`${getContainerLink(writing)}`} passHref>
      <div
        className={`p-2 m-2 rounded-xl border-white border-2 ${getColor(
          writing.writingContainerType
        )} text-white`}
      >
        <p className='text-sm'>
          {new Date(writing.timestamp).toLocaleDateString('en-US', options)}
        </p>
        <p>
          {writing.writingContainerType} - {writing.containerId}
        </p>
        <hr className='w-9/11 mx-auto bg-black text-black my-2' />
        {writing.text && writing.text ? (
          writing.text.includes('\n') ? (
            writing.text.split('\n').map((x, i) => (
              <p className='my-2' key={i}>
                {x}
              </p>
            ))
          ) : (
            <p className='my-2'>{writing.text}</p>
          )
        ) : null}
      </div>
    </Link>
  );
};

export default UserFeed;