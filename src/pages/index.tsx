import Head from "next/head";
import Footer from "@components/Footer/Footer";
import { useEffect, useState } from "react";
import { Timestamp, setDoc, doc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { database } from "src/config/firebase";

interface Challenge {
  uid: string;
  title: string;
  description: string;
  points: number;
  startTime: Timestamp;
  expirationTime: Timestamp;
}

const Home = () => {
  const [challengeData, setChallengeData] = useState<Challenge>({
    uid: "test",
    title: "test",
    description: "test",
    points: 10,
    startTime: Timestamp.now(),
    expirationTime: Timestamp.now(),
  });

  const saveChallenge = async () => {
    try {
      console.log(challengeData);
      const postDocRef = await setDoc(
        doc(database, "challenges", uuidv4()),
        challengeData
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Verde Admin</title>
      </Head>

      <main>
        <div>
          <input
            placeholder="Enter the Title.."
            onChange={(e) =>
              setChallengeData({ ...challengeData, title: e.target.value })
            }
            value={challengeData?.title}
          />
          <button onClick={() => saveChallenge()}>Save challenge</button>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
