import { toggleSidebar } from "../api_utils/geditor_utils";

function TopNav() {
  const handleClick = () => {
    toggleSidebar(false);
  };
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container ">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleClick}
        >
          <i className="fa fa-compress"></i>
        </button>
        <div className="panel__devices"></div>
        <div className="panel__editor"></div>
        <div className="panel__basic-actions"></div>
      </div>
    </nav>
  );
}

export default TopNav;
