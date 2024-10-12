import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const endpoint =
          user && user.role === "Club Convenor"
            ? "http://localhost:4000/api/v1/application/convenor/getall"
            : "http://localhost:4000/api/v1/application/student/getall";

        const res = await axios.get(endpoint, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications.");
      }
    };

    if (isAuthorized) {
      fetchApplications();
    } else {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application.");
    }
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Student" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <StudentCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Students</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <ClubConvenorCard
                element={element}
                key={element._id}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};

const StudentCard = ({ element, deleteApplication }) => {
  return (
    <div className="student_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Roll No:</span> {element.rollno}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Whatsapp:</span> {element.whatsapp}</p>
        <p><span>Interest:</span> {element.interest}</p>
        <p><span>Past Experience:</span> {element.pastexperience}</p>
        <p><span>Skills:</span> {element.skillset}</p>
        <p><span>Position Applied:</span> {element.positions}</p>
        <p><span>Club Applied:</span> {element.clubname}</p>
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

const ClubConvenorCard = ({ element }) => {
  return (
    <div className="student_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Roll No:</span> {element.rollno}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Whatsapp:</span> {element.whatsapp}</p>
        <p><span>Interest:</span> {element.interest}</p>
        <p><span>Past Experience:</span> {element.pastexperience}</p>
        <p><span>Skills:</span> {element.skillset}</p>
        <p><span>Position Applied:</span> {element.positions}</p>
        <p><span>Club Applied:</span> {element.clubname}</p>
      </div>
    </div>
  );
};

export default MyApplications;
