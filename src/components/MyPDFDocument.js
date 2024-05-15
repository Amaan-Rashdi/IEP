import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create PDF Document component
const MyPDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Student ID</Text>
        {data.map((student) => (
          <Text key={student.sno}>{student.studentId}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text>Student Name</Text>
        {data.map((student) => (
          <Text key={student.sno}>{student.studentName}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyPDFDocument;
