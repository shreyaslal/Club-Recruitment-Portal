import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PositionDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState({});
  const [hasApplied, setHasApplied] = useState(false);
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/position/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setClub(res.data.position);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });


    if (isAuthorized && user && user.role === "Student") {
      axios
        .get(`http://localhost:4000/api/v1/application/student/getall`, {
          withCredentials: true,
        })
        .then((res) => {
          const applications = res.data.applications;
          const applied = applications.some(app => app.position.toString() === id);
          setHasApplied(applied);
        })
        .catch((error) => {
          console.error("Error fetching applications:", error);
        });
    }
  }, [id, isAuthorized, user, navigateTo]);


  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="positionDetail page">
      <div className="container">
        <h3>Club Recruitment Details</h3>
        <div className="banner">
          <div className="card">
            <p>
              Club Name: <span>{club.clubName}</span>
            </p>
            <p>
              Short Description: <span>{club.shortDescription}</span>
            </p>
            <p>
              Long Description: <span>{club.longDescription}</span>
            </p>
            <p>
              Category: <span>{club.category}</span>
            </p>
            <p>
              Club Email: <span>{club.clubEmail}</span>
            </p>
            <p>
              Club Website: <span>{club.clubWebsite}</span>
            </p>
            <p>
              Convenor Email: <span>{club.convenorEmail}</span>
            </p>
            <p>
              Convenor Phone: <span>{club.convenorPhone}</span>
            </p>
            <p>
              Social Media Links: <span>{club.socialMediaLinks?.join(", ")}</span>
            </p>
            <p>
              Positions:
              <ul>
                {club.positions?.map(position => (
                  <li key={position.positionId}>
                    <span className="position-name">{position.positionName}</span>
                  </li>
                ))}
              </ul>

            </p>
            <p>
              Recruitment Type: <span>{club.recruitmentType}</span>
            </p>
            <p>
              Recruitment Rounds: <span>{club.recruitmentRounds}</span>
            </p>
            <p>
              Recruitment Process Overview: <span>{club.recruitmentProcessOverview}</span>
            </p>
            <p>
              Recruitment Schedule: <span>{club.recruitmentSchedule}</span>
            </p>
            {club.testLinks && (
              <p>
                Test Links: <span>{club.testLinks?.join(", ")}</span>
              </p>
            )}
            {club.maxApplicants && (
              <p>
                Maximum Applicants: <span>{club.maxApplicants}</span>
              </p>
            )}
            <p>
              SIG Name: <span>{club.SIGName}</span>
            </p>
            <p>
              SIG Description: <span>{club.SIGDescription}</span>
            </p>
            <p>
              SIG Convenor Contact: <span>{club.SIGConvenorContact}</span>
            </p>
            <p>
              Recruitments Announced On: <span>{new Date(club.positionPostedOn).toLocaleDateString()}</span>
            </p>

            {/* Conditional rendering based on application status */}
            {user && user.role === "Student" && (
              hasApplied ? (
                <p style={{ color: "red" }}>You have already applied for this club recruitment.</p>
              ) : (
                <div className="button-container"> {/* Wrapper for the button */}
                  <Link to={`/application/${club._id}`}>Apply Now</Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PositionDetails;
