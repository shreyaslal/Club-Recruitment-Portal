import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostPosition = () => {
  const [clubName, setClubName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("");
  const [convenorEmail, setConvenorEmail] = useState("");
  const [convenorPhone, setConvenorPhone] = useState("");
  const [clubEmail, setClubEmail] = useState("");
  const [clubWebsite, setClubWebsite] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [positions, setPositions] = useState([{ positionId: "", positionName: "" }]);
  const [recruitmentType, setRecruitmentType] = useState("");
  const [recruitmentRounds, setRecruitmentRounds] = useState("");
  const [recruitmentProcessOverview, setRecruitmentProcessOverview] = useState("");
  const [recruitmentSchedule, setRecruitmentSchedule] = useState("");
  const [testLinks, setTestLinks] = useState([]);
  const [maxApplicants, setMaxApplicants] = useState("");
  const [SIGName, setSIGName] = useState("");
  const [SIGDescription, setSIGDescription] = useState("");
  const [SIGConvenorContact, setSIGConvenorContact] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Club Convenor")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handlePositionPost = async (e) => {
    e.preventDefault();

    if (!clubName || !shortDescription || !category || !convenorEmail || !convenorPhone || !clubEmail || !positions.some(pos => pos.positionName) || !recruitmentType || !recruitmentRounds || !recruitmentProcessOverview || !recruitmentSchedule) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/position/postPosition",
        {
          clubName,
          shortDescription,
          longDescription,
          category,
          convenorEmail,
          convenorPhone,
          clubEmail,
          clubWebsite,
          socialMediaLinks,
          position: positions, // Ensure this matches the server's expectation
          recruitmentType,
          recruitmentRounds,
          recruitmentProcessOverview,
          recruitmentSchedule,
          testLinks,
          maxApplicants,
          SIGName,
          SIGDescription,
          SIGConvenorContact,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred while posting the club.");
    }
  };

  const handleAddPosition = () => {
    setPositions([...positions, { positionId: "", positionName: "" }]);
  };

  const handleRemovePosition = (index) => {
    const updatedPositions = [...positions];
    updatedPositions.splice(index, 1);
    setPositions(updatedPositions);
  };

  const handlePositionChange = (index, field, value) => {
    const updatedPositions = [...positions];
    updatedPositions[index][field] = value;
    setPositions(updatedPositions);
  };

  const handleFieldChange = (index, setFunction, list, value) => {
    const updatedList = [...list];
    updatedList[index] = value;
    setFunction(updatedList);
  };

  const handleRemoveField = (index, setFunction, list) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setFunction(updatedList);
  };

  const handleAddField = (setFunction, list) => {
    setFunction([...list, ""]);
  };

  return (
    <div className="position_post page">
      <div className="container">
        <h3>Announce Recruitments</h3>
        <form onSubmit={handlePositionPost}>
          <div className="wrapper">
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="Club Name"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Social">Social</option>
              <option value="Literary">Literary</option>
              <option value="Music">Music</option>
              <option value="Dance">Dance</option>
              <option value="Art">Art</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <textarea
            rows="4"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Short Description"
          />
          <textarea
            rows="4"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            placeholder="Long Description (optional)"
          />
          <div className="wrapper">
            <input
              type="email"
              value={convenorEmail}
              onChange={(e) => setConvenorEmail(e.target.value)}
              placeholder="Convenor Email"
            />
            <input
              type="text"
              value={convenorPhone}
              onChange={(e) => setConvenorPhone(e.target.value)}
              placeholder="Convenor Phone Number"
            />
          </div>
          <div className="wrapper">
            <input
              type="email"
              value={clubEmail}
              onChange={(e) => setClubEmail(e.target.value)}
              placeholder="Club Email"
            />
            <input
              type="text"
              value={clubWebsite}
              onChange={(e) => setClubWebsite(e.target.value)}
              placeholder="Club Website (optional)"
            />
          </div>

          {/* Handle Social Media Links */}
          <h5>Social Media Links</h5>
          {socialMediaLinks.map((link, index) => (
            <div className="wrapper" key={index}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleFieldChange(index, setSocialMediaLinks, socialMediaLinks, e.target.value)}
                placeholder={`Social Media Link ${index + 1}`}
              />
              <button type="button" onClick={() => handleRemoveField(index, setSocialMediaLinks, socialMediaLinks)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField(setSocialMediaLinks, socialMediaLinks)}>Add Another Social Media Link</button>

          {/* Handle Positions */}
          <h5>Positions</h5>
          {positions.map((position, index) => (
            <div className="wrapper" key={index}>
              <input
                type="text"
                value={position.positionName}
                onChange={(e) => handlePositionChange(index, "positionName", e.target.value)}
                placeholder={`Position Name ${index + 1}`}
              />
              <button type="button" onClick={() => handleRemovePosition(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddPosition}>Add Another Position</button>

          <div className="wrapper">
            <select
              value={recruitmentType}
              onChange={(e) => setRecruitmentType(e.target.value)}
            >
              <option value="">Select Recruitment Type</option>
              <option value="Open">Open</option>
              <option value="Exclusive">Exclusive</option>
            </select>
            <input
              type="number"
              value={recruitmentRounds}
              onChange={(e) => setRecruitmentRounds(e.target.value)}
              placeholder="Number of Rounds"
            />
          </div>
          <textarea
            rows="4"
            value={recruitmentProcessOverview}
            onChange={(e) => setRecruitmentProcessOverview(e.target.value)}
            placeholder="Recruitment Process Overview"
          />
          <label htmlFor="recruitmentSchedule">Recruitment Schedule:</label>
          <input
            id="recruitmentSchedule"
            type="datetime-local"
            value={recruitmentSchedule}
            onChange={(e) => setRecruitmentSchedule(e.target.value)}
          />

          {/* Handle Test Links */}
          <h5>Test Links</h5>
          {testLinks.map((link, index) => (
            <div className="wrapper" key={index}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleFieldChange(index, setTestLinks, testLinks, e.target.value)}
                placeholder={`Test Link ${index + 1}`}
              />
              <button type="button" onClick={() => handleRemoveField(index, setTestLinks, testLinks)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField(setTestLinks, testLinks)}>Add Another Test Link</button>

          <div className="wrapper">
            <input
              id="maxApplicants"
              type="number"
              value={maxApplicants}
              onChange={(e) => setMaxApplicants(e.target.value)}
              placeholder="Maximum Number of Applicants (optional)"
            />
          </div>

          {/* SIG Section */}
          <h5>SIG (Special Interest Group) Details</h5>
          <div className="wrapper">
            <input
              type="text"
              value={SIGName}
              onChange={(e) => setSIGName(e.target.value)}
              placeholder="SIG Name (optional)"
            />
          </div>
          <textarea
            rows="4"
            value={SIGDescription}
            onChange={(e) => setSIGDescription(e.target.value)}
            placeholder="SIG Description (optional)"
          />
          <div className="wrapper">
            <input
              type="text"
              value={SIGConvenorContact}
              onChange={(e) => setSIGConvenorContact(e.target.value)}
              placeholder="SIG Convenor Contact (optional)"
            />
          </div>

          <button type="submit">Open Recruitments</button>
        </form>
      </div>
    </div>
  );
};

export default PostPosition;
