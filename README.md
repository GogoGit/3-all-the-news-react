# All the News - React

## Reading

Read the React documentation for [Hooks](https://reactjs.org/docs/hooks-intro.html). Pay special attention to the [useState](https://reactjs.org/docs/hooks-state.html) and [useEffect](https://reactjs.org/docs/hooks-effect.html) hooks.

## Midterm

TBD

<!-- The midterm assignment is to refactor All the News including (but not limited to):

1. Correct the "#top" bug (see the logo)
1. destructuring all props in the components (e.g. no more `props.story` or `story.title`)
1. converting all css to styled components (you should delete all css files after completion)
1. using the directory structure outlined below (e.g. `story > index.js & styles.js`)
1. creating a Loading component:

```js
const Loading = () => {
  return (
    <div className="loading">
      <div />
    </div>
  );
};

export default Loading;
```

That takes this CSS:

```css
.loading {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading div {
  width: 90px;
  height: 90px;
  overflow: hidden;
  background: url("../img/spinner.svg") 50% 50% no-repeat;
  background-size: cover;
}
```

And displays this [SVG file](https://codepen.io/aurer/pen/jEGbA) while loading is occuring:

```svg
<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#007eb6" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#007eb6" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.5s"
      repeatCount="indefinite"/>
    </path>
  </svg>
``` -->

## Exercise

In the first session we created a single page app using vanilla js. In this class we will use Preact which is (for our purposes) identical to React - just much smalled and faster. We will also explore a Create React App alternative. [Vite](https://vitejs.dev/) is simpler and faster. The [setup instructions](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) are in the Get Started section.

The builds will be much smaller:

```text
React: 
46.9 kB (-1 B)  build/static/js/main.d2f0e90f.js

Preact:
dist/assets/index-BeomYdVh.js  15.28 kB │ gzip: 6.34 kB
```

Here are the differences between [React and Preact](https://preactjs.com/guide/v10/differences-to-react/).

`cd` into your class working folder (top level, not this repo) and run:

`npm create vite@latest` - set the project name to "all-the-news-vite", select `Preact` as the framework, `JavaScript` as the variant, and follow the instructions:

```sh
cd vite-project
npm install
npm run dev
```

Examine the application structure. 

- there is no `eject` here
- the number of dependencies is drastically reduced  
- `index.html` is not in the `public` folder
- we see the use of `.jsx` and lower-case naming for files which contain components.

Vite does not use Webpack to run. Instead it leverages native browser modules - `<script type="module" src="/src/main.jsx"></script>`.

Copy the `css` and `img` directories from today's download and add them to the public folder in the newly created app.

## Create the Header Component

Begin by creating a simple functional component in a components folder:

`src/components/Header.js`:

```js
const Header = (props) => {
  return (
    <header>
      <h1>{props.siteTitle}</h1>
    </header>
  );
};

export default Header;
```

App.jsx:

```js
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
    </>
  );
}

export default App;
```

## The Nav Component

Create `src/components/Nav.js` in the components folder:

```js
const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li>Nav component</li>
      </ul>
    </nav>
  );
};

export default Nav;
```

Import into App.jsx and compose it:

```js
import Header from "./components/Header";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav />
    </>
  );
}

export default App;
```

In App.jsx add our nav items:

```js
const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];
```

And send them, via props, to the Nav component:

```js
import Header from "./components/Header";
import Nav from "./components/Nav";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];

function App() {
  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
    </>
  );
}

export default App;
```

Use the [Preact developer tool](https://chromewebstore.google.com/detail/preact-developer-tools/ilcajpmogmhpliinlbcdebhbcanbghmd) to inspect the Nav component and ensure the navItems props exists and are available in Nav.js.

Now we can build out the nav items using props:

```js
const Nav = (props) => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem) => (
          <li key={navItem}>
            <a href={`#${navItem}`}>{navItem}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Note the use of a template string above to add a hash to the href.

Note that when calling `.map((navItem)` here we are not using curly `{ ... }` but rounded braces `( ... )`. All the code could exist on a single line and we are using the arrow function's implicit return.

## The Stories Component

Create `src/components/Stories.jsx` component:.

```js
const Stories = (props) => {
  return (
    <div className="site-wrap">
      <pre>
        <code>{JSON.stringify(props.stories, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Stories;
```

`JSON.stringify(props.stories, null, 2)` will take our stories data and dump it into the UI. We've added `<pre>` and `<code>` tags to make it more readable. This is a very common technique used when you prefer to examine the data in the UI instead of the console.

And import / compose it in app.jsx:

```js
import Header from "./components/Header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];

function App() {
  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      <Stories />
    </>
  );
}

export default App;
```

## Demo: State

We could add the data fetching capability in the Stories component as follows:

```js
import { useState, useEffect } from "preact/hooks";
const NYT_API = "KgGi6DjX1FRV8AlFewvDqQ8IYFGzAcHM";

const Stories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${NYT_API}`
    )
      .then((response) => response.json())
      .then((data) => setStories({ stories: data }));
  }, []);

  return (
    <div className="site-wrap">
      <pre>
        <code>{JSON.stringify(stories, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Stories;
```

But it is better to centralize your data at the highest level of the tree. Like React, Preact has a one way data flow.

<!-- END DEMO -->

## State in App

We want to store the stories data in app.jsx.

Let's begin by creating two pieces of state in app.jsx:

```js
import Header from "./components/Header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";
import { useState } from "preact/hooks";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];

function App() {
  // HERE
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      <Stories />
    </>
  );
}

export default App;
```

We initialize stories as an empty array and add a bit of state to track whether the data is loading.

Note: impoting hooks in Preact:

`import { useState } from "preact/hooks";`

is different from React:

 `import { useState } from "react";`

Next we add variables for the api key and default section and use the `useEffect` hook to fetch the data and then we pass it to the Stories component as a prop. We also pass the stories state to the Stories component.

app.jsx:

```js
import Header from "./components/Header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";
import { useState, useEffect } from "preact/hooks";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];
// HERE
const FETCH_URL = "https://api.nytimes.com/svc/topstories/v2/";
const NYT_API = "KgGi6DjX1FRV8AlFewvDqQ8IYFGzAcHM";
const section = "arts";

function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`)
      .then((response) => response.json())
      // .then((myJson) => localStorage.setItem(section, JSON.stringify(myJson)))
      .then((data) => setStorageAndState(data.results));
  }, []);

  function setStorageAndState(data) {
    localStorage.setItem(section, JSON.stringify(data));
    setStories(data.results);
  }

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      <Stories />
    </>
  );
}

export default App;
```

Ensure that arts is in localstorage and that arts is in state using the Preact dev tool.

## useEffect

In computer science, a function or expression is said to have a "side effect" if it modifies some state outside its scope or has an observable interaction with its calling functions or the outside world besides returning a value. An "effect" is anything outside your application and includes things like cookies and fetching API data.

The `useEffect` Hook lets you perform side effects in React components. By using this Hook, you tell React that your component needs to do something after it renders. By default, it runs both after the first render and after every update but we'll be customizing it to run only when the section (arts, music etc.) changes. For now, we are only using one section - arts.

The full function signature looks like this:

```js
useEffect(callbackFunction, []);
```

Note the empty array that is the second argument in useEffect. An empty array causes the effect to run only once after the component renders and again when the component unmounts or just before it is removed. `[]` tells React/Preact that your effect doesn’t depend on any values from props or state, so it never needs to re-run.

## localStorage

Here is a [possibly useful article](https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/) on localStorage in React (hint: its not that different that in is in Vanilla JS).

Add an if/else statement similar to what we used in a previous exercise.

```js
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
```

Notice, we added "section" to the dependency array.

Change the section variable:

`const section = "books";`

Note that the useEffect hook ran and the books data is in localStorage.

## The Story Component

Rather than rendering everything in the stories component we'll pass that duty off to a component called Story (singluar).

Create Story.js:

```js
const Story = (props) => {
  return (
    <div className="entry">
      <p>Story component</p>
    </div>
  );
};

export default Story;
```

Pass the stories data down to the Stories component:

```js
return (
  <>
    <Header siteTitle="All the News that Fits We Print" />
    <Nav navItems={navItems} />
    <Stories stories={stories} />
  </>
);
```

We will render multiple Story components from Stories.js with a key set to the story's index.

Stories.js:

```js
import Story from "./Story";

const Stories = (props) => {
  return (
    <div className="site-wrap">
      {props.stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
    </div>
  );
};

export default Stories;
```

Now, in Story.js, begin building out the content.

First the images:

```js
const Story = (props) => {
  return (
    <div className="entry">
      <img
        src={
          props.story.multimedia
            ? props.story.multimedia[1].url
            : "/img/no-image.png"
        }
        alt="images"
      />
    </div>
  );
};

export default Story;
```

And then the content:

```js
const Story = (props) => {
  return (
    <div className="entry">
      <img
        src={
          props.story.multimedia
            ? props.story.multimedia[1].url
            : "/img/no-image.png"
        }
        alt="images"
      />
      <div>
        <h3>
          <a href={props.story.short_url}>{props.story.title}</a>
        </h3>
        <p>{props.story.abstract}</p>
      </div>
    </div>
  );
};

export default Story;
```

## Loading

Allow data to be fetched before we try to render the rest of the application.

Let's switch the isLoading piece of state to true while the fetch operation is under way and set it to false once the operation has completed.

Set isLoading to false by default in the initial declaration, then set it to true before the fetch operation, and finally set it back to false afterwards.

We'll also add an if statment that shows "Loading" while the data is loading.

```js
import Header from "./components/header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";
import { useState, useEffect } from "preact/hooks";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];
const FETCH_URL = "https://api.nytimes.com/svc/topstories/v2/";
const NYT_API = "KgGi6DjX1FRV8AlFewvDqQ8IYFGzAcHM";

function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState("arts");

  useEffect(() => {
    setLoading(true);
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

  useEffect(() => {
    console.log("setting localstorage");
    localStorage.setItem(section, JSON.stringify(stories));
  }, [stories]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      <Stories stories={stories} />
    </>
  );
}
```

If you leave the loading state true after the fetch you should see the early return.

Set it to false at the end of the useEffect function:

`setLoading(false);`

(We can also see the loading block by slowing loading in the Network tab of the developer tools.)

## Refactor

Simplify App.jsx by moving some of the functionality in App.jsx into a new `scr/api.js` file:

```js
const FETCH_URL = "https://api.nytimes.com/svc/topstories/v2/";
const NYT_API = "RuG9N6lD1Xss81PdRbmhuiJHjuiPEt6R";

export function fetchStoriesFromLocalStorage(section, setStories) {
  setStories(JSON.parse(localStorage.getItem(section)));
}

export function fetchStoriesFromNYTimes(section, setStories) {
  fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`)
    .then((response) => response.json())
    .then((myJson) => {
      localStorage.setItem(section, JSON.stringify(myJson.results));
    });
  setStories(JSON.parse(localStorage.getItem(section)));
}
```

## async/await

Read [this article](https://www.smashingmagazine.com/2020/11/comparison-async-await-versus-then-catch/) on Async/await vs `.then` chaining.

Sample:

```js
someFunc() {
    fetch('https://someurl.com')
        .then((response) => response.json())
        .then((data) => console.log(data)

    console.log("I will not be blocked")
}
```

Compare the `fetchStoriesFromNYTimes` function above with the one below in light of the preceeding.

```js
export function fetchStoriesFromNYTimes(section, setStories) {
  fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`)
    .then((response) => response.json())
    .then((myJson) => {
      localStorage.setItem(section, JSON.stringify(myJson.results));
      setStories(JSON.parse(localStorage.getItem(section)));
    })
    .catch((error) => console.log(error));
}
```

Sample:

```js
async someFunc() {
    let response = await fetch('https://someurl.com');
    let data = await response.json();
    console.log("I will be blocked", data);
}
```

```js
export async function fetchStoriesFromNYTimes(section, setStories) {
  try {
    let response = await fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`);
    console.log("response::", response);
    let data = await response.json();
    console.log("data::", data);
    localStorage.setItem(section, JSON.stringify(data.results));
    setStories(JSON.parse(localStorage.getItem(section)));
  } catch (error) {
    console.error(error);
  }
}
```

See the "async-await-vs-then" folder in today's repo.

---

Import api and use it in the App component:

```js
import Header from "./components/Header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";
import { fetchStoriesFromLocalStorage, fetchStoriesFromNYTimes } from "./api";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];

function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState("arts");

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem(section)) {
      fetchStoriesFromNYTimes(section, setStories);
    } else {
      fetchStoriesFromLocalStorage(section, setStories);
    }
    setLoading(false);
  }, [section]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      <Stories stories={stories} />
    </>
  );
}

export default App;
```

## Multiple Sections

Currently our app only renders the arts section. We need to code the navbar tabs to communicate with App.jsx in order to call fetch for additional sections.

Since clicking on the nav is what changes the section we'll pass `setSection` into the Nav in App.jsx:

```js
return (
  <>
    <Header siteTitle="All the News that Fits We Print" />
    <Nav navItems={navItems} setSection={setSection} />
    <Stories stories={stories} />
  </>
);
```

We'll use a new component in Nav to display each of the nav elements.

Create NavItem.js:

```js
const NavItem = (props) => {
  return (
    <li>
      <a href={`#${props.navItem}`}>{props.navItem}</a>
    </li>
  );
};
export default NavItem;
```

Import it and compose it in Nav.js:

```js
import NavItem from "./NavItem";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem, index) => (
          <NavItem key={index} navItem={navItem} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Now we need to pass the setSection function to NavItem from Nav.js:

```js
import NavItem from "./NavItem";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem, index) => (
          <NavItem
            key={index}
            navItem={navItem}
            setSection={props.setSection}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Once in NavItem we will create a local function `sendSection` and run it on an onClick event:

```js
const NavItem = (props) => {
  const sendSection = (section) => {
    props.setSection(section);
  };

  return (
    <li>
      <a href={`#${props.navItem}`} onClick={() => sendSection(props.navItem)}>
        {props.navItem}
      </a>
    </li>
  );
};
export default NavItem;
```

The click event now communicates with the setSection function in App.jsx and our useState hook runs again when the section changes:

```js
useEffect(() => {
  setLoading(true);
  if (!localStorage.getItem(section)) {
    fetchStoriesFromNYTimes(section, setStories);
  } else {
    fetchStoriesFromLocalStorage(section, setStories);
  }
  setLoading(false);
}, [section]);
```

Note we've added `section` to the previously empty useFetch dependencies array. The array allows you to determine when the effect will run. The empty array caused the effect to run once after the component rendered. When we add a piece of state or a prop to the array the effect will run whenever that state or prop changes.

`.catch` has also been added at the end of the promise chain to log any errors that might occur.

Test it in the browser.

## Touch Ups

Add the logo list item to Nav.js:

```js
import NavItem from "./NavItem";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li className="logo">
          <a href="#top">
            <img src="img/logo.svg" alt="logo" />
          </a>
        </li>
        {props.navItems.map((navItem, index) => (
          <NavItem
            key={index}
            navItem={navItem}
            setSection={props.setSection}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Remove the `fill` attribute in the svg file.

Note: `style` expects an object. we could also write it:

```js
const Nav = (props) => {

  const svgStyles = {
    fill: "white",
  };
```

[URL encode](https://yoksel.github.io/url-encoder/) the logo and use it inline passing the style block:

```js
export const Logo = ({ svgStyles }) => (
  <img
    style={svgStyles}
    src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg width='256px' fill='white' height='188px' viewBox='0 0 256 188' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid'%3E%3Cg%3E%3Cpath d='M244.675204,104.605355 C237.22468,95.3667056 227.837021,89.257276 216.214203,86.5750874 C219.790454,81.0616997 221.727591,74.9522702 221.727591,68.2467987 C221.727591,58.8591385 218.44936,50.8125728 211.743888,44.1071013 C205.038417,37.4016298 196.991852,34.1233993 187.60419,34.1233993 C179.110593,34.1233993 171.809081,36.8055879 165.55064,42.3189756 C160.335274,29.5040745 151.990688,19.2223516 140.36787,11.4738068 C128.894063,3.87427241 116.228172,0 102.370198,0 C83.4458673,0 67.3527358,6.70547148 54.0908033,19.967404 C40.8288708,33.2293365 34.1233993,49.322468 34.1233993,68.2467987 C34.1233993,69.4388825 34.2724098,71.3760187 34.4214203,73.9091969 C23.9906869,78.8265425 15.6461001,86.1280559 9.38766007,95.9627475 C3.12922003,105.648429 0,116.377183 0,127.85099 C0,144.242143 5.81140862,158.398138 17.5832364,170.020955 C29.2060536,181.643772 43.3620489,187.60419 59.7532014,187.60419 L204.740397,187.60419 C218.896392,187.60419 230.96624,182.537835 240.949942,172.554133 C250.933643,162.570431 256,150.500582 256,136.344587 C255.850989,124.572759 252.125728,113.993015 244.675204,104.605355 L244.675204,104.605355 L244.675204,104.605355 Z M200.717113,187.60419 L179.557626,187.60419 L172.405122,165.25262 L131.12922,165.25262 L123.976717,187.60419 L102.817229,187.60419 L140.963912,81.2107101 L162.570431,81.2107101 L200.717113,187.60419 L200.717113,187.60419 L200.717113,187.60419 Z M136.493598,148.265424 L167.040745,148.265424 L151.841677,100.284051 L136.493598,148.265424 L136.493598,148.265424 Z' %3E%3C/path%3E%3C/g%3E%3C/svg%3E%0A"
    alt="logo"
  />
);
```

Compose it in Nav.js:

```js
<li className="logo">
  <a href="#top">
    <Logo svgStyles={svgStyles} />
  </a>
</li>
```

## Section Headers

We'll also add a header to the top of the article list.

In App.jsx:

```js
<Stories stories={stories} section={section} />
```

In Stories.js:

```js
import Story from "./Story";

const Stories = (props) => {
  return (
    <div className="site-wrap">
      <h2 className="section-head">{props.section}</h2>
      {props.stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
    </div>
  );
};

export default Stories;
```

## Active State

Add a highlight to the current nav item to indicate the section we are viewing.

We can use the section state to set the activeLink property.

Pass the section info to the Nav component.

In App.jsx:

```js
<Nav navItems={navItems} setSection={setSection} section={section} />
```

And then forward the property from Nav to the NavItem component:

```js
import NavItem from "./NavItem";
import { Logo } from "./Logo";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li className="logo">
          <a href="#top">
            <Logo />
          </a>
        </li>
        {props.navItems.map((navItem, index) => (
          <NavItem
            key={index}
            navItem={navItem}
            setSection={props.setSection}
            section={props.section}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Use the section in a ternary expression to set the class name:

```js
const NavItem = (props) => {
  const sendSection = (section) => {
    props.setSection(section);
  };

  return (
    <li>
      <a
        className={props.navItem === props.section ? "active" : ""}
        href={`#${props.navItem}`}
        onClick={() => sendSection(props.navItem)}
      >
        {props.navItem}
      </a>
    </li>
  );
};
export default NavItem;
```

Note the supporting CSS for this in the public folder:

```css
nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

nav a {
  text-decoration: none;
  display: inline-block;
  color: white;
  text-transform: capitalize;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
}

nav a.active {
  box-shadow: inset 0 0 0 2px white;
  border-radius: 6px;
}

nav a:not(.active):hover {
  box-shadow: inset 0 0 0 2px white;
  border-radius: 6px;
  background-color: #00aeef;
}
```

## DEMO Cookies

Currently if a user refreshes the page the section is reset to the default: `const [section, setSection] = useState("arts");`. We could store the current section in a cookie to prevent this.

```js
import Header from "./components/Header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";
import { fetchStoriesFromLocalStorage, fetchStoriesFromNYTimes } from "./api";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];

const getExpirationDate = (time) => {
  return new Date(+new Date() + time).toUTCString();
};

const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const cookieVal = getCookie("section");

if (cookieVal) {
  console.log("  ", cookieVal);
}

function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [section, setSection] = useState("arts");
  const [section, setSection] = useState(cookieVal || "arts");

  useEffect(() => {
    document.cookie = `section=${section}; expires=${getExpirationDate(
      1000 * 60 * 60 * 24 * 7
    )}`;
  }, [section]);

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem(section)) {
      fetchStoriesFromNYTimes(section, setStories);
    } else {
      fetchStoriesFromLocalStorage(section, setStories);
    }
    setLoading(false);
  }, [section]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      {/* <Nav navItems={navItems} setSection={setSection} /> */}
      <Nav navItems={navItems} setSection={setSection} section={section} />
      {/* <Stories stories={stories} /> */}
      <Stories stories={stories} section={section} />
    </>
  );
}

export default App;
```

## URL Parameters

A better method might be to use the URL hashes in the browser's location. Cookies are set on the user's browser, but what would happen if our user copied the url from the browser and sent it to another person? (Answer: the default "arts" section would be displayed. Not good.)

First, [get the URL](https://gomakethings.com/getting-values-from-a-url-with-vanilla-js/) and convert the URL string into a URL object using the new URL() constructor.

```js
const url = new URL(window.location.href);
const hash = url.hash.slice(1);
```

Do this within a `useEffect` hook in App.jsx:

```js
useEffect(() => {
  const url = new URL(window.location.href);
  const hash = url.hash.slice(1);
  if (hash !== "undefined") {
    console.log(" hash::", hash);
    setSection(hash);
  } else {
    setSection("arts");
  }
}, []);
```

## Styled Components

Examine the New York Times website in the dev tool's elements panel.

There are many solutions for working programmatically with CSS and components:

- [Stitches](https://stitches.dev)
- [Emotion](https://emotion.sh/docs/introduction)

We will use [Styled Components](https://styled-components.com/) to refactor our CSS.

`$ npm i styled-components`

We'll start on the lower level components and work our way up beginning with the Story component:

```js
import styled from "styled-components";

const Entry = styled.article`
  display: grid;
  grid-template-columns: 1fr 7fr;
  grid-column-gap: 1rem;
  margin-bottom: 1rem;
  grid-area: "entry";
  border-bottom: 1px dotted #00000033;
  a {
    color: #007eb6;
    text-decoration: none;
  }
  h3 + p {
    margin-top: 0;
  }
  img {
  }
`;

const Story = (props) => {
  return (
    <Entry>
      <img
        src={
          props.story.multimedia
            ? props.story.multimedia[1].url
            : "/img/no-image.png"
        }
        alt="images"
      />
      <div>
        <h3>
          <a href={props.story.short_url}>{props.story.title}</a>
        </h3>
        <p>{props.story.abstract}</p>
      </div>
    </Entry>
  );
};

export default Story;
```

Now we can remove any css from 'styles.css` that references the class entry.

To make things interesting we are going to add a link around the entire component to make the whole entry clickable.

```js
import styled from "styled-components";

const Wrapper = styled.a`
  text-decoration: none;
  border-bottom: 1px dotted #00000033;
`;

const Entry = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;
  margin-bottom: 1rem;
  grid-area: "entry";
`;

const StoryTitle = styled.h3`
  color: #007eb6;
  text-decoration: none;
`;

const StoryImg = styled.img`
  width: 100%;
`;

const StoryPara = styled.p`
  margin-top: 0;
  color: #111;
`;

const Story = (props) => {
  return (
    <Wrapper href={props.story.short_url}>
      <Entry>
        <StoryImg
          src={
            props.story.multimedia
              ? props.story.multimedia[2].url
              : "/img/no-image.png"
          }
          alt="images"
        />
        <div>
          <StoryTitle>{props.story.title}</StoryTitle>

          <StoryPara>{props.story.abstract}</StoryPara>
        </div>
      </Entry>
    </Wrapper>
  );
};

export default Story;
```

## Project Structure

Create a story directory in components and move Story.js into it. Correct the import statement in Stories.js.

Create a separate styles.js file in the directory and move the styled components into it:

```js
import styled from "styled-components";

export const Wrapper = styled.a`
  text-decoration: none;
  border-bottom: 1px dotted #00000033;
`;

export const Entry = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;
  margin-bottom: 1rem;
  grid-area: "entry";
`;

export const StoryTitle = styled.h3`
  color: #007eb6;
  text-decoration: none;
`;

export const StoryImg = styled.img`
  width: 100%;
`;

export const StoryPara = styled.p`
  margin-top: 0;
  color: #111;
`;
```

Import the named exports into the Story component and destructure the props:

```js
import { Wrapper, Entry, StoryImg, StoryTitle, StoryPara } from "./styles";

const Story = ({ story: { short_url, multimedia, title, abstract } }) => {
  return (
    <Wrapper href={short_url}>
      <Entry>
        <StoryImg
          src={multimedia ? multimedia[2].url : "/img/no-image.png"}
          alt="images"
        />
        <div>
          <StoryTitle>{title}</StoryTitle>

          <StoryPara>{abstract}</StoryPara>
        </div>
      </Entry>
    </Wrapper>
  );
};

export default Story;
```

Rename Story.js to index.js and check the import statement in Stories.js:

```js
import Story from "./story";
```

Use styled components in Stories:

```js
import Story from "../story";

import { Wrapper, PageHeader } from "./styles";

const Stories = ({ section, stories }) => {
  return (
    <Wrapper>
      <PageHeader>{section}</PageHeader>
      {stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
    </Wrapper>
  );
};

export default Stories;
```

styles.js:

```js
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 94vw;
  max-width: 960px;
  margin: 24px auto;
  background: white;
  padding: 1rem;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);

  display: grid;
  grid-template-columns: repeat(1fr 1fr);
  grid-template-rows: repeat(1fr 1fr);
  grid-gap: 1rem;
  grid-template-areas:
    "sectionhead sectionhead"
    "entry entry";
`;

export const PageHeader = styled.h2`
  font-family: Lobster;
  color: var(--blue);
  font-size: 2.5rem;
  text-transform: capitalize;
  padding-bottom: 0.25rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #007eb677;
  grid-area: sectionhead;
`;
```

## Instructor Notes
