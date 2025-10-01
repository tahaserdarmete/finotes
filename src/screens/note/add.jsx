import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { defaultScreenStyle } from '../../styles/screenStyle';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '../../components/ui/Button';
import { screenHeight, screenWidth } from '../../utils/constans';
import { Colors } from '../../theme/colors';
import Input from '../../components/ui/Input';
import { createNote } from '../../redux/actions/noteActions';

const AddNote = ({ navigation }) => {
  // Reduxtan şuan giriş yapmış kullanıcının verilerini getir
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const NoteSchema = Yup.object().shape({
    title: Yup.string().required('Required Field'),
    description: Yup.string().required('Required Field'),
  });

  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        <Formik
          initialValues={{
            userId: user.id,
            title: '',
            description: '',
          }}
          validationSchema={NoteSchema}
          onSubmit={async values => {
            // redux thunk aksiyonunu çalıştırmak lazım

            // Burada direk SQL'e not ekleyen fonksiyonu çalıştırsaydık notumuz yerel depoya eklenirdi.Ama geçici hafızamızdadeğişiklik olmadığı için notlar sayfasına gittiğimizde en son eklenen notu görmek için tekrardan tekrardan getallnote fonksiyonunu çağırmak zorunda kalırdık.
            await dispatch(createNote(values));

            navigation.goBack();
          }}
        >
          {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
            <View>
              <Input
                error={errors.title}
                style={[styles.input, styles.inputTitle]}
                label="Title"
                labelStyle={styles.labelStyle}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                placeholder="title"
              />

              <Input
                error={errors.description}
                style={[styles.input, styles.inputDesc]}
                multiline
                label="Note"
                labelStyle={styles.labelStyle}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                placeholder="description"
              />

              <Button onPress={handleSubmit} title="Create Note" />
            </View>
          )}
        </Formik>
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
    height: screenHeight * 0.57,
  },

  labelStyle: {
    marginVertical: 0,
    fontSize: 16,
    marginBottom: 5,
  },
});
