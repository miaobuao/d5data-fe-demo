import { useEffect, useState } from "react";

export default function UserData(props: { userId: string }) {
  const user = useUserInfo(props.userId);
  const [seconds, setSeconds] = useState(0);
  let intervalId: ReturnType<typeof setInterval>;

  useEffect(() => {
    intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    user.update(props.userId);
  }, [props.userId]);

  return (
    <div>
      <h1>User Data Component</h1>
      {user.info ? (
        <div>
          <p>Name: {user.info?.name}</p>
          <p>Email: {user.info?.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
}

function useUserInfo(userId: string) {
  const [info, setInfo] = useState<{ name: string; email: string }>();

  async function fetchData(userId: string) {
    await fetch(`https://secret.url/user/${userId}`)
      .then((response) => response.json())
      .then(setInfo)
      .catch((error) => console.error("Error fetching user data:", error));
  }

  async function update(id?: string) {
    if (id === userId || id === undefined) {
      return;
    }
    userId = id;
    await fetchData(userId);
  }

  useEffect(() => {
    fetchData(userId);
  }, []);

  return {
    info,
    update,
  };
}
