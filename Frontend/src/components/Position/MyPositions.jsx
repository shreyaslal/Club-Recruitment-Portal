import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyPositions = () => {
  const [myPositions, setMyPositions] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Club Convenor")) {
      navigateTo("/");
      return;
    }

    const fetchPositions = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/position/getMyPositions", { withCredentials: true });
        setMyPositions(data.myPositions);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred while fetching open recruitments.");
        setMyPositions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [isAuthorized, user, navigateTo]);

  const handleEnableEdit = (positionId) => {
    setEditingMode(positionId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdatePosition = async (positionId) => {
    const updatedPosition = myPositions.find((position) => position._id === positionId);
    try {
      const res = await axios.put(`http://localhost:4000/api/v1/position/updatePosition/${positionId}`, updatedPosition, { withCredentials: true });
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while updating the recruitment details.");
    }
  };

  const handleDeletePosition = async (positionId) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/position/deletePosition/${positionId}`, { withCredentials: true });
      toast.success(res.data.message);
      setMyPositions((prevPositions) => prevPositions.filter((position) => position._id !== positionId));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while closing the recruitments.");
    }
  };

  const handleInputChange = (positionId, field, value) => {
    setMyPositions((prevPositions) =>
      prevPositions.map((position) => (position._id === positionId ? { ...position, [field]: value } : position))
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="myPositions page">
      <div className="container">
        <h1>Recruitments Opened by You</h1>
        {myPositions.length > 0 ? (
          <div className="banner">
            {myPositions.map((element) => (
              <div className="card" key={element._id}>
                <div className="content">
                  <div className="short_fields">
                    {/* Fields for editing the position */}
                    {[
                      "clubName",
                      "category",
                      "shortDescription",
                      "longDescription",
                      "convenorEmail",
                      "convenorPhone",
                      "clubEmail",
                      "clubWebsite",
                      "SIGName",
                      "SIGDescription",
                      "SIGConvenorContact",
                      "recruitmentProcessOverview"
                    ].map((field) => (
                      <div key={field}>
                        <span>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1') + ":"}</span>
                        <input
                          type={field === "longDescription" || field === "SIGDescription" || field === "recruitmentProcessOverview" ? "textarea" : "text"}
                          disabled={editingMode !== element._id}
                          value={element[field]}
                          onChange={(e) => handleInputChange(element._id, field, e.target.value)}
                        />
                      </div>
                    ))}

                    {/* Positions */}
                    <div>
                      <span>Positions:</span>
                      {element.positions.map((position) => (
                        <div key={position.positionId}>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={position.positionName} // Displaying positionName
                            onChange={(e) => {
                              const updatedPositions = element.positions.map(pos =>
                                pos.positionId === position.positionId ? { ...pos, positionName: e.target.value } : pos
                              );
                              handleInputChange(element._id, "positions", updatedPositions);
                            }}
                          />
                          {/* Removed displaying positionId */}
                        </div>
                      ))}
                    </div>

                    {/* Recruitment Type */}
                    <div>
                      <span>Recruitment Type:</span>
                      <select
                        value={element.recruitmentType}
                        onChange={(e) => handleInputChange(element._id, "recruitmentType", e.target.value)}
                        disabled={editingMode !== element._id}
                      >
                        <option value="Open">Open</option>
                        <option value="Exclusive">Exclusive</option>
                      </select>
                    </div>

                    {/* Recruitment Rounds */}
                    <div>
                      <span>Number of Recruitment Rounds:</span>
                      <input
                        type="number"
                        disabled={editingMode !== element._id}
                        value={element.recruitmentRounds}
                        onChange={(e) => handleInputChange(element._id, "recruitmentRounds", e.target.value)}
                      />
                    </div>

                    {/* Recruitment Schedule */}
                    <div>
                      <span>Recruitment Schedule:</span>
                      <input
                        type="datetime-local"
                        disabled={editingMode !== element._id}
                        value={element.recruitmentSchedule}
                        onChange={(e) => handleInputChange(element._id, "recruitmentSchedule", e.target.value)}
                      />
                    </div>

                    {/* Social Media Links */}
                    <div>
                      <span>Social Media Links:</span>
                      {element.socialMediaLinks.map((link, index) => (
                        <input
                          key={index}
                          type="text"
                          disabled={editingMode !== element._id}
                          value={link}
                          onChange={(e) => {
                            const updatedLinks = [...element.socialMediaLinks];
                            updatedLinks[index] = e.target.value;
                            handleInputChange(element._id, "socialMediaLinks", updatedLinks);
                          }}
                        />
                      ))}
                    </div>

                    {/* Test Links */}
                    <div>
                      <span>Test Links:</span>
                      {element.testLinks.map((link, index) => (
                        <input
                          key={index}
                          type="text"
                          disabled={editingMode !== element._id}
                          value={link}
                          onChange={(e) => {
                            const updatedTestLinks = [...element.testLinks];
                            updatedTestLinks[index] = e.target.value;
                            handleInputChange(element._id, "testLinks", updatedTestLinks);
                          }}
                        />
                      ))}
                    </div>

                    {/* Max Applicants */}
                    <div>
                      <span>Max Applicants:</span>
                      <input
                        type="number"
                        disabled={editingMode !== element._id}
                        value={element.maxApplicants || ""}
                        onChange={(e) => handleInputChange(element._id, "maxApplicants", e.target.value)}
                      />
                    </div>

                    {/* Expired */}
                    <div>
                      <span>Expired:</span>
                      <select
                        value={element.expired}
                        onChange={(e) => handleInputChange(element._id, "expired", e.target.value)}
                        disabled={editingMode !== element._id}
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="button_wrapper">
                  <div className="edit_btn_wrapper">
                    {editingMode === element._id ? (
                      <>
                        <button onClick={() => handleUpdatePosition(element._id)} className="check_btn">
                          <FaCheck />
                        </button>
                        <button onClick={handleDisableEdit} className="cross_btn">
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleEnableEdit(element._id)} className="edit_btn">
                        Edit
                      </button>
                    )}
                  </div>
                  <button onClick={() => handleDeletePosition(element._id)} className="delete_btn">
                    Close
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You've not opened any recruitments or may have closed all of your recruitments!</p>
        )}
      </div>
    </div>
  );
};

export default MyPositions;
