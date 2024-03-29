import Header from "./components/Header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";
import { useState, useEffect } from "preact/hooks";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];
const FETCH_URL = "https://api.nytimes.com/svc/topstories/v2/";
// const NYT_API = "KgGi6DjX1FRV8AlFewvDqQ8IYFGzAcHM";
const NYT_API = "87INHgSZyqypdcXwAnjLDiWSVT0mW7vA";

const section = "arts";

export function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`)
  //     .then((response) => response.json())
  //     .then((data) => setStorageAndState(data));
  // }, []);
  // Note the [] to stop the infinate loop issue

  useEffect(() => {
    if (!localStorage.getItem(section)) {
      console.log("fetching from NYT");
      fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`)
        .then((response) => response.json())
        .then((data) => setStories(data.results));
    } else {
      console.log("section is in storage, not fetching");
      setStories(JSON.parse(localStorage.getItem(section)));
    }
  }, [section]);
  //Note the [section] to stop the infinate loop issue but it also monitors when the section changes.
  //So once the section changes, it will run again.

  function setStorageAndState(data) {
    localStorage.setItem(section, JSON.stringify(data));
    setStories(data.results);
  }

  return (
    <>
      <Header siteTitle="All the News That Fits We Print" />
      <Nav navItems={NAVITEMS} />
      <Stories stories={stories} />
    </>
  );
}

// export default App;  //Don't need this due to the way it's imported from main.jsx
