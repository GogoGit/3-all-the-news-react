const Nav = (props) => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem) => (
          <li key={navItem}>
            <a href={`#{navItem}`}>{navItem}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
