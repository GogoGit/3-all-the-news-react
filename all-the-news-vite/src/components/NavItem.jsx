const NavItem = (props) => {
  const sendSection = (section) => {
    props.setSection(section);
  };

  //Note Turnary Operator!!!
  return (
    <li>
      <a
        href={`#${props.navItem}`}
        className={props.navItem === props.section ? "active" : ""}
        onClick={() => sendSection(props.navItem)}
      >
        {props.navItem}
      </a>
    </li>
  );
};
export default NavItem;
