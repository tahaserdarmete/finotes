import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { defaultScreenStyle } from '../../styles/screenStyle';
import { Colors } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllNotes } from '../../redux/slices/noteSlice';
import { deleteNoteDromDb, getAllNotesFromDb } from '../../utils/db';
import NoteItem from '../../components/ui/NoteItem';
import ListEmptyComponent from '../../components/notes/ListEmptyComponent';

const NoteList = () => {
  const pending = false;

  const dispatch = useDispatch();

  const { notes } = useSelector(state => state.note);

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    // IIFE
    // Immediately Invoking Function Expression
    // Anında çağırılan fonksiyon ifadesi
    // (async () => {
    //   await dispatch(
    //     createNote({
    //       userId: 1,
    //       title: 'ilk not',
    //       description: 'çok uzun bir olmayan kısa bir not açıklaması',
    //     }),
    //   );
    // })();

    const fonksiyon = async () => {
      try {
        // Bu fonksiyona spesifik bir numara vermek yerine giriş yapmış kişinin ID'sini vererek, sadece o kullanıcıya ait notları getir dedik. Bu sayede aynı telefondan birden fazla kullanıcı uygulamayı kullansa da herkes sadece kendi notlarına erişim sağlamış oldu.
        await dispatch(getAllNotes({ userId: user.id }));
        //
      } catch (err) {
        console.error(err);
      }

      console.log('Fonksiyon çalıştı.');
    };

    fonksiyon();
  }, []);

  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        {pending ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size={'large'} color={Colors.GRAY} />
          </View>
        ) : (
          <FlatList
            numColumns={2}
            data={notes}
            renderItem={({ item, index }) => <NoteItem note={item} />}
            ListEmptyComponent={<ListEmptyComponent />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NoteList;

const styles = StyleSheet.create({});
