import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import Login from '../components/Login';
import { getSession, useSession } from "next-auth/client"
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { useState } from 'react'
import { db } from '../firebase'
import firebase from 'firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import DocumentRow from '../components/DocumentRow'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')

  const [session, loading] = useSession()
  if (!session) return <Login />

  const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').orderBy('timestamp', 'desc'))
  const createDocument = (e) => {
  
    if (!input) return;

    db.collection('userDocs').doc(session.user.email).collection('docs').add({
      filename: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setShowModal(false);
    setInput('')
  }
  const modal = (
    <Modal
      size='sm'
      active={showModal}
      toggler={() => setShowModal(false)}
    >
      <ModalBody>
        <input value={input}
          placeholder='Enter the document'
          className='outline-none w-full'
          onChange={(e) => setInput(e.target.value)}
          type='text'
          onKeyDown={e => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={(e) => setShowModal(false)}
          ripple='dark'
        >Cancel</Button>
        <Button
          onClick={createDocument}
          color='blue'
          ripple='light'
        >Create</Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div className="">
      <Head>
        <title>Google docs clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}

      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new Document</h2>
            <Button
              color='gray'
              iconOnly={true}
              buttonType='outline'
              ripple='dark'
              className='border-0'
            >
              <Icon name="more_vert" size='3xl' />
            </Button>
          </div>
          <div>
            <div onClick={() => setShowModal(true)} className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'>
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-gray-700 text-sm">Blank</p>

          </div>
        </div>
      </section>

      <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto'>
          <div className=' py-8 pb-5 flex items-center justify-between text-sm text-gray-700'>
            <h2 className='font-medium flex-grow'>
              My Documents
            </h2>
            <p className='mr-10'>Date Created</p>
            <Icon name='folder' size='3xl' />
          </div>
        </div>
        {snapshot?.docs.map(doc=>(
          <DocumentRow 
          key={doc.id}
          id={doc.id}
          filename={doc.data().filename}
          date={doc.data().timestamp}
          />
        ))}
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }
}