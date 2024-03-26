import {FaCoins, FaGlobe, FaShoppingCart} from "react-icons/fa";
import {AiFillHdd} from "react-icons/ai";
import Chart from "./Chart/Chart";
import Corousel from "./carousel/Carousel";
import Link from "next/link";
import {BsFillPostcardHeartFill} from "react-icons/bs";

const Dashboard = () => {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card bg-glass">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <Link href="/post" style={{color: "#000"}}>
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        Resent Post
                      </p>
                      <h5 className="font-weight-bolder">$53,000</h5>
                      <p className="mb-0">
                        <span className="text-success text-sm font-weight-bolder">
                          100 Units
                        </span>
                        &nbsp;this month In
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                    <BsFillPostcardHeartFill
                      style={{
                        color: "white",
                        marginTop: "12px",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card bg-glass">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Total Property
                    </p>
                    <h5 className="font-weight-bolder">2,300</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        80 Units{' '}
                      </span>
                      since last week
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                    <FaGlobe
                      style={{
                        color: "white",
                        marginTop: "12px",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card bg-glass">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      About to Expire
                    </p>
                    <h5 className="font-weight-bolder">+3,462</h5>
                    <p className="mb-0">
                      <span className="text-danger text-sm font-weight-bolder">
                        10 Units{' '}
                      </span>
                      since last quarter
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                    <AiFillHdd
                      style={{
                        color: "white",
                        marginTop: "12px",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card bg-glass">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Low Stock Levels{" "}
                    </p>
                    <h5 className="font-weight-bolder">$103,430</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        20 Units
                      </span>{" "}
                      than last month
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                    <FaShoppingCart
                      style={{
                        color: "white",
                        marginTop: "12px",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <Chart />
        <Corousel />
      </div>
    </div>
  );
};

export default Dashboard;
