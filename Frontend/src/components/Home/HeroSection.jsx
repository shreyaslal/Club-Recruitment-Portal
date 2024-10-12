import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "45+",
      subTitle: "Available Positions",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "15+",
      subTitle: "Clubs",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "6,500+",
      subTitle: "Students",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "15+",
      subTitle: "Club Convenors",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Find a club that suits</h1>
            <h1>your interests and skills</h1>
            <p>
              At NITK, there are numerous clubs and organizations tailored to a variety of interests. Whether you’re passionate about technology, arts, sports, or social causes, there’s something for everyone. Joining a club is a great way to enhance your skills, meet new people, and make the most of your college experience.
            </p>
          </div>
          <div className="image">
            <img src="/heroS.png" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
