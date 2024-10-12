import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [clubname, setClubName] = useState("");
  const [name, setName] = useState("");
  const [rollno, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [interest, setInterest] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [positions, setPositions] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleApplication = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("clubname", clubname);
    formData.append("name", name);
    formData.append("rollno", rollno);
    formData.append("email", email);
    formData.append("whatsapp", whatsapp);
    formData.append("interest", interest);
    formData.append("pastexperience", experience);
    formData.append("skillset", skills);
    formData.append("positions", positions);
    formData.append("positionId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setClubName("");
      setName("");
      setRollNo("");
      setEmail("");
      setWhatsapp("");
      setInterest("");
      setExperience("");
      setSkills("");
      setPositions("");
      toast.success(data.message);
      navigateTo("/positions/getall");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (!isAuthorized || (user && user.role === "Club Convenor")) {
    navigateTo("/");
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Club Name"
            value={clubname}
            onChange={(e) => setClubName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Roll Number"
            value={rollno}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Your WhatsApp Number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
          <textarea
            placeholder="Why are you interested in joining?"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            required
          />
          <textarea
            placeholder="Any relevant past experience?"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
          <textarea
            placeholder="Your skillset?"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Positions"
            value={positions}
            onChange={(e) => setPositions(e.target.value)}
            required
          />
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
