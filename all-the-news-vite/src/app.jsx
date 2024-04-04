import Header from "./components/Header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";
import { useState, useEffect } from "preact/hooks";

const bolDebug = true;
let intOrder = 1;

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];
const FETCH_URL = "https://api.nytimes.com/svc/topstories/v2/";
const NYT_API = "PGQuh0auTqHC6HEx4gADBhT2yLCdXYbN";

export function App() {
  if (bolDebug) {
    console.log(`(${intOrder})   export function App()`);
    intOrder++;
  }

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  // we are testing to see if we have a hash value and if not we are setting the default value to 'arts'
  const [section, setSection] = useState("arts");

  useEffect(() => {
    if (bolDebug) {
      console.log(`(${intOrder})   useEffect Check URL`);
      intOrder++;
    }

    const url = new URL(window.location.href);
    if (bolDebug) {
      console.log(url);
    }
    const hash = url.hash.slice(1); //we want the url without the hash #

    if (bolDebug) {
      console.log(
        `URL hash:  ${hash}, type of ${typeof hash}, length: ${hash.length}`
      );
    }

    if (hash !== "undefined" && hash.length !== 0) {
      setSection(hash);
      if (bolDebug) {
        console.log(`URL hash Updated to:  ${hash}, URL = ${url}`);
      }
    } else {
      setSection("arts");
      window.location.href = "http://localhost:5173/#arts";

      if (bolDebug) {
        console.log(`URL hash Default to: arts, URL Hash '${url.hash}'`);
      }
    }
  }, []);

  // if(bolDebug){console.log(``)};

  useEffect(() => {
    // on Refersh this reverts to STATE Default = "arts"?????

    if (bolDebug) {
      console.log(`(${intOrder})   useEffect Check Storage Location`);
      console.log(`section being used:  ${section}`);
      intOrder++;
    }

    if (!localStorage.getItem(section)) {
      console.log("fetching from NYT");
      setLoading(true);
      fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`)
        .then((response) => response.json())
        .then((data) => {
          setStories(data.results);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    } else {
      console.log("section is in storage, not fetching");
      setStories(JSON.parse(localStorage.getItem(section)));
    }
  }, [section]);

  useEffect(() => {
    if (bolDebug) {
      console.log(`(${intOrder})   useEffect Setting Local Storage`);
      console.log(`section being used:  ${section}`);
      console.log(`stories init value: `, { stories });
      console.log(`stories length value: ${stories.length}`);
      intOrder++;
    }

    if (stories.length > 0) {
      localStorage.setItem(section, JSON.stringify(stories));
    }

    if (bolDebug) {
      console.log({ stories });
    }
  }, [stories]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {/* Note you can add UI elements here to test your code! view your variables. */}
      <Header siteTitle="All the News That Fits We Print" />
      <Nav navItems={NAVITEMS} setSection={setSection} section={section} />
      <Stories stories={stories} />
    </>
  );
}
