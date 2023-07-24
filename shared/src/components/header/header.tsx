import classNames from "classnames";
import { css } from "goober";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <div className={classNames(style.root)}>
      <img src={logo} alt="Manitowoc Logo" />
      {/* <div className={style.logo}>foo</div> */}
      <div className={style.language}>bar</div>
      <div className={style.login}>zi</div>
    </div>
  );
}

const style = {
  root: css({ display: "flex" }),
  logo: css({ backgroundImage: "url(logo.png)" }),
  language: css({ marginLeft: "auto" }),
  login: css({}),
};
