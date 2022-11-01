import React, { Component } from "react";
class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
          <div className="container-fluid text-center">
            <div className="row">
              <div className="col-sm-12">
                <p>
                  copyright &copy; {new Date().getFullYear()} || built By{" "}
                  <a href="https://www.linkedin.com/in/izaaz-azaam-syahalam-5a752a202/">
                    Izaaz Azaam Syahalam
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
