import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import React from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import AppColors from "../../assets/colors/AppColors";
import Header from "../../components/headers/Header";

const PrivacyPolicy = ({navigation}) => {
    return (
        <View style={{flex: 1, width: wp('100'), backgroundColor: AppColors.white, paddingVertical: hp('6')}}>
            <Header navigation={navigation} scrnName={'Privacy Policy'} leftIconClr={AppColors.black}/>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Privacy Policy</Text>
                <Text style={styles.date}>Last updated: 07/05/2024</Text>

                <View style={styles.section}>
                    <Text style={styles.title}>1. Introduction</Text>
                    <Text style={styles.text}>
                        Welcome to Livmeetup! This Privacy Policy explains how we collect, use, disclose, and safeguard
                        your information when you use our application. Please read this privacy policy carefully. If you
                        do not agree with the terms of this privacy policy, please do not access the application.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>2. Information We Collect</Text>
                    <Text style={styles.subtitle}>Personal Data</Text>
                    <Text style={styles.text}>
                        When you use our application, we may collect personally identifiable information such as your
                        name, email address, phone number, and other contact or identifying information you choose to
                        provide.
                    </Text>
                    <Text style={styles.subtitle}>Usage Data</Text>
                    <Text style={styles.text}>
                        We may collect information about your activity on our application, such as the date and time you
                        logged in, features you used, and actions you took.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>3. How We Use Your Information</Text>
                    <Text style={styles.text}>
                        We use the information we collect in the following ways:
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • To provide, operate, and maintain our application
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • To improve, personalize, and expand our application
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • To understand and analyze how you use our application
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • To develop new products, services, features, and functionality
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • To communicate with you, either directly or through one of our partners, including for
                        customer service, to provide you with updates and other information relating to the application,
                        and for marketing and promotional purposes
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • To process your transactions and manage your orders
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • To find and prevent fraud
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>4. Sharing Your Information</Text>
                    <Text style={styles.text}>
                        We may share your information with third parties in the following situations:
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • With your consent: We may share or disclose your information with your consent.
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • For legal reasons: We may share your information to comply with applicable laws and
                        regulations, to respond to a subpoena, search warrant, or other lawful request for information
                        we receive, or to otherwise protect our rights.
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • Business transfers: We may share or transfer your information in connection with, or during
                        negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
                        portion of our business to another company.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>5. Security of Your Information</Text>
                    <Text style={styles.text}>
                        We use administrative, technical, and physical security measures to help protect your personal
                        information. While we have taken reasonable steps to secure the personal information you provide
                        to us, please be aware that despite our efforts, no security measures are perfect or
                        impenetrable, and no method of data transmission can be guaranteed against any interception or
                        other type of misuse.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>6. Your Privacy Rights</Text>
                    <Text style={styles.text}>
                        Depending on your location, you may have the following rights regarding your personal
                        information:
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • The right to access: You have the right to request copies of your personal data.
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • The right to rectification: You have the right to request that we correct any information you
                        believe is inaccurate or complete information you believe is incomplete.
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • The right to erasure: You have the right to request that we erase your personal data, under
                        certain conditions.
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • The right to restrict processing: You have the right to request that we restrict the
                        processing of your personal data, under certain conditions.
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • The right to object to processing: You have the right to object to our processing of your
                        personal data, under certain conditions.
                    </Text>
                    <Text style={styles.bulletPoint}>
                        • The right to data portability: You have the right to request that we transfer the data that we
                        have collected to another organization, or directly to you, under certain conditions.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>7. Changes to This Privacy Policy</Text>
                    <Text style={styles.text}>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                        the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically
                        for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>8. Contact Us</Text>
                    <Text style={styles.text}>
                        If you have any questions about this Privacy Policy, please contact us:
                    </Text>
                    <Text style={styles.text}>
                        • By email: [your-email@example.com]
                    </Text>
                    <Text style={styles.text}>
                        • By visiting this page on our website: [your-website-url]
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    date: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    bulletPoint: {
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
        marginBottom: 5,
    },
});

export default PrivacyPolicy;
