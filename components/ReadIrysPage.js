import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { decodeFromAnkyverseLanguage } from "../lib/ankyverse";
import { getOneWriting } from "../lib/irys";
import Link from "next/link";
import Button from "./Button";
import { Inter } from "next/font/google";
import IndividualDecodedCastCard from "./farcaster/IndividualDecodedCastCard";
import Image from "next/image";
import { useUser } from "../context/UserContext";
import { usePrivy } from "@privy-io/react-auth";
import Spinner from "./Spinner";

const inter = Inter({ subsets: ["cyrillic"], weight: ["400"] });

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

const ReadIrysPage = ({ setShow }) => {
  const router = useRouter();
  const { authenticated, login } = usePrivy();
  const [thisWriting, setThisWriting] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [copyText, setCopyText] = useState("copy text");
  const [copyLinkText, setCopyLinkText] = useState("copy link");
  const { farcasterUser, userDatabaseInformation, allUserWritings } = useUser();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: adds a smooth scrolling effect
    });
  };

  useEffect(() => {
    async function searchThisText() {
      if (!authenticated || !allUserWritings) {
        const writingFromIrys = await getOneWriting(router.query.cid);
        setThisWriting({ text: writingFromIrys.text, timestamp: new Date() });
        setLoadingPage(false);
        console.log("the writing From irys is: ", writingFromIrys);
      }
      if (!allUserWritings & !router) return;
      console.log("all th user writings are: ", allUserWritings);
      if (allUserWritings.length === 0) return;
      console.log("in hereereer", allUserWritings);
      const thisIrysIndex = allUserWritings.findIndex((x) => {
        console.log("the x is: ", x);
        console.log("the router", router.query);
        return x.cid == router.query.cid;
      });
      console.log("this irys index is: ", thisIrysIndex);
      console.log("sadsads", allUserWritings[thisIrysIndex]);
      const writerPlaceholder = allUserWritings[thisIrysIndex];
      console.log("the writer placeholder is: ", writerPlaceholder);
      if (writerPlaceholder) {
        setThisWriting(writerPlaceholder);
        setLoadingPage(false);
      }
    }
    searchThisText();
  }, [allUserWritings, router]);

  async function handleDisplayComments() {
    setDisplayComments((x) => !x);
  }
  async function handleRecast(e) {
    e.currentTarget.blur();
    const prev = hasUserRecasted;
    setHasUserRecasted(!prev);
    const response = await axios.post(`${apiRoute}/farcaster/api/reaction`, {
      reactionType: "recast",
      hash: cast.hash,
      signer_uuid: farcasterUser.signer_uuid,
    });
    if (response.status !== 200) {
      alert("there was an error recasting");
      setHasUserRecasted(!prev);
    }
  }
  async function handleLike(e) {
    console.log("THE EEEEE IS: ", e);
    e.currentTarget.blur();
    const prev = hasUserLiked;
    setHasUserLiked(!prev);
    const response = await axios.post(`${apiRoute}/farcaster/api/reaction`, {
      reactionType: "like",
      hash: cast.hash,
      signer_uuid: farcasterUser.signer_uuid,
    });
    if (response.status !== 200) {
      alert("there was an error recasting");
      setHasUserLiked(!prev);
    }
  }
  async function sendManaToCastCreator() {
    try {
      if (manaForCongratulation > userDatabaseInformation.manaBalance)
        return alert("You dont have enough $NEWEN balance for that.");
      alert(`this will send ${manaForCongratulation} to the user`);
      console.log("the total", totalNewenEarned, manaForCongratulation);
      setTotalNewenEarned(
        Number(totalNewenEarned) + Number(manaForCongratulation)
      );
      setDisplaySendNewen(false);
    } catch (error) {
      console.log("there was an error sending the mana to the user", error);
    }
  }

  const copyToClipboard = async () => {
    if (!thisWriting) return;
    await navigator.clipboard.writeText(thisWriting.text);
    setCopyText("copied");
    setTimeout(() => {
      setCopyText("copy text");
    }, 1111);
  };

  const copyLinkToClipboard = async () => {
    if (!thisWriting) return;
    await navigator.clipboard.writeText(
      `https://www.anky.lat/i/${router.query.cid}`
    );
    setCopyLinkText("copied");
    setTimeout(() => {
      setCopyLinkText("copy link");
    }, 1111);
  };

  if (loadingPage)
    return (
      <div className="mt-4 text-white">
        <Spinner />
        <p>loading...</p>
      </div>
    );

  if (!thisWriting)
    return (
      <div className="mt-8 text-white">
        <p>writing not found</p>
        {!authenticated && (
          <div className="text-white w-64 mx-auto">
            <p className="mb-2">perhaps you need to login</p>

            <Button
              buttonAction={login}
              buttonText="login"
              buttonColor="bg-green-600"
            />
          </div>
        )}
      </div>
    );

  return (
    <div
      className={`${inter.className} h-full flex flex-col items-start justify-start text-left pt-8`}
    >
      <div className="overflow-y-scroll h-full md:w-96 mx-auto text-white ">
        <span className="text-sm  w-96 top-1 left-1/2 -translate-x-1/2">
          {new Date(thisWriting.timestamp).toLocaleDateString("en-US", options)}
        </span>
        <div className="my-2 flex ">
          <Button
            buttonAction={copyToClipboard}
            buttonText={copyText}
            buttonColor="bg-green-600 mx-2 w-32 text-center"
          />
          <Button
            buttonAction={copyLinkToClipboard}
            buttonText={copyLinkText}
            buttonColor="bg-purple-600 w-32 text-center"
          />
        </div>

        {thisWriting ? (
          thisWriting.text.includes("\n") ? (
            thisWriting.text.split("\n").map((x, i) => (
              <p className="my-2" key={i}>
                {x}
              </p>
            ))
          ) : (
            <p className="my-2">{thisWriting.text}</p>
          )
        ) : null}
        <div className="w-full text-center">
          <p className="text-purple-600">
            here, there will be a button that will take you right back to
            warpcast
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadIrysPage;
