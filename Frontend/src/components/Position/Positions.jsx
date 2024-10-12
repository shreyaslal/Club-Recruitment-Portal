import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/position/getAllPositions", {
          withCredentials: true,
        });
        setPositions(res.data.positions);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="positions page">
      <div className="container">
        <h1>Clubs Open for Recruitment!</h1>
        <div className="banner">
          {positions && positions.map((element) => (
            <div className="card" key={element._id}>
              <div className="content">
                {/* Club Name */}
                <div>
                  <span>Club Name:</span>
                  <p>{element.clubName}</p>
                </div>

                {/* Category */}
                <div>
                  <span>Category:</span>
                  <p>{element.category}</p>
                </div>

                {/* Positions (array) */}
                <div>
                  <span>Positions:</span>
                  <ul>
                    {element.positions.map((position) => (
                      <li key={position.positionId}>
                        {position.positionName} {/* Only displaying position name */}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Link to view detailed club information */}
                <Link to={`/position/${element._id}`} className="view-details-link">
                  View Club Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Positions;
