import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { defaultScreenStyle } from '../../styles/screenStyle';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '../../components/ui/Button';
import { screenHeight, screenWidth } from '../../utils/constans';
import { Colors } from '../../theme/colors';
import Input from '../../components/ui/Input';

const AddNote = () => {
  // Reduxtan şuan giriş yapmış kullanıcının verilerini getir
  const { user } = useSelector(state => state.auth);

  const NoteSchema = Yup.object().shape({
    title: Yup.string().required('Required Field'),
    description: Yup.string().required('Required Field'),
  });

  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        <ScrollView>
          <Formik
            initialValues={{
              userId: user.id,
              title: '',
              description: '',
            }}
            validationSchema={NoteSchema}
            onSubmit={values => console.log(values)}
          >
            {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
              <View>
                <Input
                  error={errors.title}
                  style={[styles.input, styles.inputTitle]}
                  label="Title"
                  labelStyle={styles.labelStyle}
                />

                <Input
                  style={[styles.input, styles.inputDesc]}
                  multiline
                  label="Note"
                  labelStyle={styles.labelStyle}
                />

                <Button title="Create Note" />
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  input: {
    minHeight: screenHeight * 0.06,
    paddingHorizontal: screenWidth * 0.01,
    paddingVertical: screenHeight * 0.01,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 0,
    borderWidth: 1,
  },

  inputTitle: {
    fontWeight: '700',
    fontSize: 24,
  },

  inputDesc: {
    fontSize: 16,
    height: screenHeight * 0.63,
  },

  labelStyle: {
    marginVertical: 0,
    fontSize: 16,
    marginBottom: 5,
  },
});
