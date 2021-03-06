import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import styles from "./SocialLinks.module.scss";


function SocialLinks() {
  const initialState = {
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  };
  const icons = {
    Facebook: "facebook-square",
    Twitter: "twitter",
    Instagram: "instagram",
    Linkedin: "linkedin",
    Youtube: "youtube",
  };
  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [id, setId] = useState("");

  const onClick = (e) => {
    if (id === e.currentTarget.id) {
      setShow(!show);
    } else {
      setId(e.currentTarget.id);
      setShow(true);
    }
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id.toLowerCase()]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    alert('Clicked!')
  };

  return (
      <Container fluid="lg" className="dashboard">
        <Row>
          <Col>
            <div ref={ref}>
              <i
                className={`fa fa-facebook-square fa-3x ${styles.facebook}`}
                id="Facebook"
                onClick={onClick}
              />
              <i
                className={`fa fa-twitter fa-3x ${styles.twitter}`}
                id="Twitter"
                onClick={onClick}
              />
              <i
                className={`fa fa-instagram fa-3x ${styles.instagram}`}
                id="Instagram"
                onClick={onClick}
              />
              <i
                className={`fa fa-youtube fa-3x ${styles.youtube}`}
                id="Youtube"
                onClick={onClick}
              />
              <i
                className={`fa fa-linkedin-square fa-3x ${styles.linkedin}`}
                id="Linkedin"
                onClick={onClick}
              />
              <Form
                className={styles.animOpacity}
                style={{ display: show ? "block" : "none" }}
                onSubmit={onSubmit}
              >
                <Form.Label htmlFor="basic-url" srOnly>
                  Enter your {id} URL
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                      <i
                        className={`fa fa-${icons[id]} ${styles[id.toLowerCase()]
                          }`}
                        style={{ padding: "0px", width: "20px" }}
                      />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="https://example.com/..."
                    id={id.toLowerCase()}
                    value={formData[`${id.toLowerCase()}`] || ""}
                    onChange={onChange}
                    aria-describedby="basic-addon3"
                    style={{ maxWidth: "400px" }}
                  />
                </InputGroup>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
  );
}

export default SocialLinks;
