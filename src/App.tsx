import { Formik, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Card, Container, Dimmer, Form, Header, Item, List, Loader, Modal, Segment } from 'semantic-ui-react';
import './App.css';
import { getURL } from './EnviromentContext';

type Message = {
  id?: number,
  name: string,
  message: string
}

type MessageModal = {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  setLoading: (value: boolean) => void,
}

type MessageUpdateModal = {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  setLoading: (value: boolean) => void,
  message: Message
}

function App() {

  const [messages, setMessages] = useState<Message[]>();
  const [open, isOpen] = useState<boolean>(false);
  const [updateOpen, isUpdateOpen] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message>();
  const [loading, setLoading] = useState<boolean>(false);

  const getMessages = async () => {
    let result  = await (await fetch(getURL()+"GetAllMessages")).json() as Message[];
    setMessages(result);
    setLoading(false);
  }

  const deleteMessage = async (id: number) => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Number(id))
  };
    await (await fetch((getURL()+"DeleteMessage"), requestOptions));
    getMessages();
  }

  useEffect(() => {
    getMessages();
  }, [open, updateOpen]);

  return (
    <div style={{height: "100%", width: "100%"}}>
      <Dimmer active={loading}>
        <Loader>Loading</Loader>
      </Dimmer>
    <Button disabled={false} style={{marginTop: "150px", marginLeft: "307px", marginRight: "300px", textAlign: "right", padding: "0px"}}><div style={{padding: "15px"}} onClick={() => {isOpen(true)}}>Create Message</div></Button>
    <Card.Group style={{marginTop: "5px", marginLeft: "300px", marginRight: "300px"}}>
      {messages?.map((x) => {
        return(
          <>
        <Card>
      <Card.Content>
        <Card.Header>{x.name}</Card.Header>
        <Card.Description>
          {x.message}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => {isUpdateOpen(true); setSelectedMessage(x);}}>
            Update
          </Button>
          <Button basic color='red' onClick={() => {deleteMessage(x.id || 0);}}>
            Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
    </>
      )})}
      <MessageUpdateModal message={selectedMessage || {} as Message} isOpen={updateOpen} setIsOpen={(value: boolean) => isUpdateOpen(value)} setLoading={(value: boolean) => setLoading(value)}></MessageUpdateModal>
      <MessageModal isOpen={open} setIsOpen={(value: boolean) => isOpen(value)} setLoading={(value: boolean) => setLoading(value)}></MessageModal>
  </Card.Group>
  </div>
  );
}

const MessageModal = (propss : MessageModal) => {

  const createMessage = async (values: Message) => {
    propss.setLoading(true);
    const message = {
      name: values.name,
      message: values.message
    } as Message;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
  };
    await (await fetch((getURL()+"HttpTrigger"), requestOptions));
    propss.setIsOpen(false)
  }

  return(
  <Modal
  onClose={() => propss.setIsOpen(true)}
  open={propss.isOpen}
>
  <Modal.Header>Create a Message</Modal.Header>
  <Modal.Content>
  <Formik
      initialValues={{
        name: '',
        message: ''
      }}
      onSubmit={async (values: Message) => {
        console.log("terst")
        await createMessage(values);
      }}
    >
      {props => {
        const {
          handleSubmit,
        } = props;
        return (
      <Form onSubmit={handleSubmit}>

        <label htmlFor="name">Name</label>
        <Field id="name" name="name" label="message"/>

        <div style={{marginTop: "15px", marginBottom: "20px"}}>
        <label htmlFor="message">Message</label>
        <Field id="message" name="message" label="message"/>
        </div>

          <div style={{textAlign: "right"}}>
          <Button color='black' onClick={() => propss.setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Create"
            labelPosition='right'
            icon='checkmark'
            positive
            type="submit"
          />
          </div>
      </Form>
        );}}
    </Formik>
  </Modal.Content>
  
</Modal>
  )
}

const MessageUpdateModal = (propss : MessageUpdateModal) => {

  const updateMessage = async (values: Message) => {
    propss.setLoading(true);
    const message = {
      id: propss.message.id,
      name: values.name,
      message: values.message
    } as Message;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
  };
    await (await fetch((getURL()+"UpdateMessage"), requestOptions));
    propss.setIsOpen(false)
  }

  return(
  <Modal
  onClose={() => propss.setIsOpen(true)}
  open={propss.isOpen}
>
  <Modal.Header>Update a Message</Modal.Header>
  <Modal.Content>
  <Formik
      initialValues={{
        name: propss.message.name,
        message: propss.message.message
      }}
      onSubmit={async (values: Message) => {
        await updateMessage(values);
      }}
    >
      {props => {
        const {
          handleSubmit,
        } = props;
        return (
      <Form onSubmit={handleSubmit}>

        <label htmlFor="name">Name</label>
        <Field id="name" name="name" label="message"/>

        <div style={{marginTop: "15px", marginBottom: "20px"}}>
        <label htmlFor="message">Message</label>
        <Field id="message" name="message" label="message"/>
        </div>

          <div style={{textAlign: "right"}}>
          <Button color='black' onClick={() => propss.setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Update"
            labelPosition='right'
            icon='checkmark'
            positive
            type="submit"
          />
          </div>
      </Form>
        );}}
    </Formik>
  </Modal.Content>
  
</Modal>
  )
}

export default App;
