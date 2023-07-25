import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";

const style = { width: "18rem" };

function HomeCard() {
  return (
    <div className="col-4 mt-5 mx-auto">
      <Card style={style}>
        <CardImg
          alt="..."
          src={require("./logo0.png")}
          top
        ></CardImg>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button
            color="primary"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Go somewhere
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default HomeCard;