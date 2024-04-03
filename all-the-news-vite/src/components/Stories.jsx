// import Story from "./Story";

// // Story is the component
// const Stories = ({ stories }) => {
//   return (
//     <div className="site-wrap">
//       {stories.map((story, index) => {
//         return <Story key={index} story={story} />;
//       })}
//     </div>
//   );
// };

// export default Stories;

import Story from "./Story";

const Stories = ({ stories }) => {
  return (
    <div class="site-wrap">
      {stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
    </div>
  );
};

export default Stories;
