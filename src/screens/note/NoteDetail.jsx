import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { defaultScreenStyle } from '../../styles/screenStyle';
import { screenHeight, screenWidth } from '../../utils/constans';
import Button from '../../components/ui/Button';

const NoteDetail = ({ route }) => {
  const { note } = route.params;

  const [title, setTitle] = useState(note.title);
  const [desc, setDesc] = useState(note.description);

  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        <ScrollView>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[styles.input, styles.inputTitle]}
          />
          <TextInput
            value={desc}
            onChangeText={setDesc}
            multiline
            style={[styles.input, styles.inputDesc]}
          />
          <Button title="Save Note" />
          <Button title="Delete Note" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
  input: {
    minHeight: screenHeight * 0.07,
    paddingHorizontal: screenWidth * 0.01,
    paddingVertical: screenHeight * 0.01,
  },

  inputTitle: {
    fontWeight: '700',
    fontSize: 24,
  },

  inputDesc: {
    fontSize: 16,
    height: screenHeight * 0.65,
  },
});
