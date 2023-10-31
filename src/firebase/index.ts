import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { config } from './config';
import { FormState } from '../types/store/form';

const app: FirebaseApp = initializeApp(config);
export const db = getFirestore(app);

export const deleteFirestoreDoc = async (docId: string) => {
  try {
    await deleteDoc(
      doc(
        db,
        process.env.REACT_APP_FIRESTORE_TREATMENT_RECORD_COLLECTION as string,
        docId
      )
    );
  } catch (error) {
    console.error(error);
  }
};

export const getFirestoreDoc = async (docId: string) => {
  try {
    const docRef = doc(
      db,
      process.env.REACT_APP_FIRESTORE_TREATMENT_RECORD_COLLECTION as string,
      docId
    );
    const docSnap = await getDoc(docRef).catch((e) => {
      throw e;
    });
    if (docSnap.exists()) {
      return docSnap.data() as Partial<FormState> & { fs_updated_at: Date };
    } else {
      // doc.data() will be undefined in this case
      console.error('No such document!');
    }
  } catch (error) {
    console.error(error);
  }
};

export const setFirestoreDoc = async (docId: string, data: FormState) => {
  try {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (data[key] === undefined) {
          delete data[key];
        }
      }
    }

    await setDoc(
      doc(
        db,
        process.env.REACT_APP_FIRESTORE_TREATMENT_RECORD_COLLECTION as string,
        docId
      ),
      { ...data }
    ).catch((e) => {
      throw e;
    });
  } catch (error) {
    console.error(error);
  }
};
