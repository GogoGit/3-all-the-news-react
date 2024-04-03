import NavItem from "./NavItem";

//Destructure setSection, Prop Drilling setSection={setSection} (from app.jsx)
const Nav = ({ navItems, setSection, section }) => {
  return (
    <nav>
      <ul>
        {navItems.map((navItem, index) => (
          // <li key={navItem}>
          //   <a href={`#${navItem}`}>{navItem}</a>
          // </li>
          <NavItem
            key={index}
            navItem={navItem}
            setSection={setSection}
            section={section}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
