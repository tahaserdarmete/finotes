import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/colors';

const TextDescription = ({ description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default TextDescription;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  description: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.BLACK,
  },
});
