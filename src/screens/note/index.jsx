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
import { createNote } from '../../redux/slices/noteSlice';

const NoteList = () => {
  const pending = false;

  const dispatch = useDispatch();

  const { notes } = useSelector(state => state.note);

  useEffect(() => {
    console.log(notes);
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
            data={notes}
            renderItem={({ item, index }) => (
              <View key={index}>
                <Text style={{ fontSize: 25 }}>{item.title}</Text>
                <Text style={{ fontSize: 15 }}>{item.text}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NoteList;

const styles = StyleSheet.create({});
