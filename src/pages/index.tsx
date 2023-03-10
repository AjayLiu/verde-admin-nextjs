import Head from "next/head";
import Footer from "@components/Footer/Footer";
import { useEffect, useState } from "react";
import {
  Timestamp,
  setDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { database } from "src/config/firebase";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

interface Challenge {
  uid: string;
  title: string;
  description: string;
  impact: string;
  points: number;
  startTime: Timestamp;
  expirationTime: Timestamp;
}

const Home = () => {
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  const [challengeData, setChallengeData] = useState<Challenge>();

  const [startDate, setStartDate] = useState(todayMidnight);
  const [endDate, setEndDate] = useState(todayMidnight);

  const saveChallenge = async () => {
    try {
      const uuid = uuidv4();
      const postDocRef = await setDoc(doc(database, "challenges", uuid), {
        startTime: Timestamp.fromDate(todayMidnight),
        expirationTime: Timestamp.fromDate(todayMidnight),
        ...challengeData,
        uid: uuid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [existingChallenges, setExistingChallenges] = useState<Challenge[]>();
  // Fetch current challenges
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challenges = await getDocs(collection(database, "challenges"));
        const challengeList = challenges.docs.map((c) =>
          c.data()
        ) as Challenge[];
        console.log(challengeList);
        setExistingChallenges(challengeList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChallenges();
  }, []);

  return (
    <>
      <Head>
        <title>Verde Admin</title>
      </Head>

      <main>
        <h1>Verde Admin Page</h1>
        <div style={{ marginBottom: "100px" }}>
          <h2>Create a new Challenge:</h2>
          <div>
            <label>Challenge Title</label>
            <input
              placeholder="Challenge Title"
              onChange={(e) =>
                setChallengeData({ ...challengeData, title: e.target.value })
              }
              value={challengeData?.title}
            />
          </div>
          <div>
            <label>Challenge Description</label>
            <input
              placeholder="Challenge Description"
              onChange={(e) =>
                setChallengeData({
                  ...challengeData,
                  description: e.target.value,
                })
              }
              value={challengeData?.description}
            />
          </div>
          <div>
            <label>Challenge Impact</label>
            <input
              placeholder="Challenge Impact"
              onChange={(e) =>
                setChallengeData({
                  ...challengeData,
                  impact: e.target.value,
                })
              }
              value={challengeData?.impact}
            />
          </div>
          <div>
            <label>Challenge Points</label>
            <input
              placeholder="Challenge Points"
              onChange={(e) =>
                setChallengeData({
                  ...challengeData,
                  points: parseInt(e.target.value),
                })
              }
              value={challengeData?.points}
              datatype="number"
            />
          </div>
          <div>
            <label>Start time</label>
            <DateTimePicker
              value={startDate}
              onChange={(e) => {
                setStartDate(e);
                setChallengeData({
                  ...challengeData,
                  startTime: Timestamp.fromDate(e),
                });
              }}
            />
          </div>
          <div>
            <label>End time</label>
            <DateTimePicker
              value={endDate}
              onChange={(e) => {
                setEndDate(e);
                setChallengeData({
                  ...challengeData,
                  expirationTime: Timestamp.fromDate(e),
                });
              }}
            />
          </div>
          <button onClick={() => saveChallenge()}>Create challenge</button>
        </div>
        <div>
          <h2>Existing Challenges: </h2>
          <div>
            {existingChallenges &&
              existingChallenges.map((c: Challenge) => {
                return (
                  <div>
                    <p>
                      uid: {c.uid}, title: {c.title}, description:{" "}
                      {c.description}, impact: {c.impact}, points: {c.points},
                      start:
                      {c.startTime.toDate().toLocaleString()}, end:
                      {c.expirationTime.toDate().toLocaleString()}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
