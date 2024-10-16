import React from 'react'
import './Privacy.css'

function Privacy() {
    const data = [
        {
          category: 'NAME, CONTACT INFORMATION AND IDENTIFIERS',
          description: 'Real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, social security number, driver’s license number, passport number, or other similar identifiers.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        },
        {
          category: 'CUSTOMER RECORDS',
          description: 'Paper and electronic customer records containing personal information, such as name, signature, social security number, physical characteristics or description, address, telephone number, passport number, driver’s license or state identification card number, insurance policy number, education, employment, employment history, bank account number, credit card number, debit card number, or any other financial information, medical information, or health insurance information.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        },
        {
          category: 'PROTECTED CLASSIFICATIONS',
          description: 'Characteristics of protected classifications under California or federal law such as race, color, sex, age, religion, national origin, disability, citizenship status, and genetic information.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        },
        {
          category: 'PURCHASE HISTORY AND TENDENCIES',
          description: 'Commercial information including records of personal property, products or services purchased, obtained, or considered, or other purchasing or consuming histories or tendencies.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        },
        {
          category: 'USAGE DATA',
          description: 'Internet or other electronic network activity information, including browsing history, search history, and information regarding a California consumer’s interaction with an Internet website, application, or advertisement.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        },
        {
          category: 'GEOLOCATION DATA',
          description: 'Precise geographic location information about a particular individual or device.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        },
        {
          category: 'AUDIO/VISUAL',
          description: 'Audio, electronic, visual, thermal, olfactory, or similar information.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        },
        {
          category: 'EMPLOYMENT HISTORY',
          description: 'Professional or employment-related information.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        },
        {
          category: 'EDUCATION INFORMATION',
          description: 'Information about education history or background.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        },
        {
          category: 'PROFILES AND INFERENCES',
          description: 'Inferences drawn from any of the information identified above to create a profile about a California consumer reflecting the consumer’s preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes.',
          collect: 'YES',
          disclose: 'YES',
          sell: 'NO'
        }
      ];

      const rights = [
        {
          title: 'Deletion',
          description: 'You have the right to request deletion of personal information that we have collected about you, subject to certain exemptions (for example, where the information is used by us to detect security incidents, debugging or to comply with a legal obligation).'
        },
        {
          title: 'Copy',
          description: 'Consumers have the right to request a copy of the specific pieces of personal information that we have collected about them in the prior 12 months.'
        },
        {
          title: 'Correction',
          description: 'Consumers have the right to request that we correct inaccuracies in the personal information that we have collected about them.'
        },
        {
          title: 'Right to Know',
          description: 'Consumers have the right to request that we disclose certain information about how we have handled personal information in the prior 12 months, including: (i) categories of personal information collected; (ii) categories of third parties/with whom we have disclosed or shared their personal information; (iii) categories of sources of personal information; (iv) categories of personal information collected; (v) categories of third parties to whom the consumer’s personal information has been sold and the specific categories of personal information sold to each category of third party; (vi) categories personal information that we have disclosed or shared with a third party for a business purpose; (vii) business and/or commercial purposes for collecting and selling their personal information.'
        }
      ];
      const datas = [
        {
          category: "Service Providers and Other Third Parties",
          description:
            "This third parties help with our business operations (such as, but not limited to, fraud investigations, bill collection, payment processing, and site analytics and operations) and are prohibited from using your personal information for any purpose other than to provide this assistance and are required to protect personal information collected by them on behalf of ResumeNerd or disclosed to them by us and to comply with the general privacy principles described in this Privacy Policy."
        },
        {
          category: "Our Affiliates and Subsidiaries",
          description:
            "The information may be disclosed: (1) to provide joint content and our products and services (e.g., registration, transactions, analytics and customer support); (2) to help detect and prevent potentially illegal acts, violations of our policies, fraud and/or data security breaches; and (3) to guide decisions about ResumeNerd’s or third party’s products, sites, applications, services, tools, and communications. Their use and disclosure of your information will be subject to this Policy. Members of our corporate family will use this information to send you marketing communications and you will have the opportunity to opt-out in email communications."
        },
        {
          category: "Ad Networks",
          description:
            "We work with third parties to serve advertisement, provide us with data collection, reporting, ad response measurement and site analytics and assist with delivery of relevant marketing messages and advertisements. These third parties can view, edit or set their own tracking technologies/cookies. The use of these technologies by these third parties is subject to their own privacy policies and is not covered by this Privacy Policy. They might also obtain information about other applications that you have downloaded to your mobile device, the mobile websites you visit and other information about you or your device in order to analyze and serve anonymous targeted advertising on the Site and elsewhere. For more information about third party ad servers at our Site and your ability to opt-out of targeted advertising from such third parties, please visit https://www.aboutads.info/choices/ which provides information about certain companies."
        },
        {
          category: "Companies in the Mobile App Industry",
          description:
            "If you access the Site through a mobile device or app, we may also share your information with Carriers, operating systems and platforms."
        },
        {
          category: "Change of Control – New Owners",
          description:
            "Other business entities, should we plan to merge with or be acquired by that business entity. Should such a combination occur, we will make reasonable efforts to request that the new combined entity follow this Privacy Policy with respect to your personal information. If your personal information would be used contrary to this policy, you will receive prior notice and depending on the circumstances, an opportunity to opt-in to or opt-out of the new use."
        },
        {
          category: "Analytics Providers",
          description:
            "Analytics Providers such as Google Analytics, to evaluate usage of our Site, and to help us improve our services, performance and user experiences."
        },
        {
          category: "Legal and Law Enforcement",
          description:
            "Law enforcement, governmental agencies, or authorized third parties, in response to a verified request relating to a criminal investigation or alleged illegal activity or any other activity that may expose us, you, or any other ResumeNerd user to legal liability. In such events, we will only disclose information relevant and necessary to the investigation or inquiry, such as name, city, state, ZIP code, telephone number, email address, user ID history, IP address, fraud complaints, and anything else we may deem relevant to the investigation."
        },
        {
          category: "Other Entities with your Consent",
          description:
            "We may share your personal information with third parties to whom you explicitly ask us to send your information (or about whom you are otherwise explicitly notified and consent to when using a specific service). On the Site, you may have opportunities to express interest in or register for other products and services. If you do, we will provide information about you to those third parties, or parties working on their behalf, to implement your request."
        },
      ];
    
  return (
    <div className='privacy'>
        <a href='/' >Home</a>

       <div className='privacybox'>

        <h1>Privacy Policy</h1>
        <p style={{color:'white'}}>This website is owned and operated by AS Global Softtech  (“Company”, “we”, “us”), and this Privacy Policy outlines our online information practices, and your options regarding the collection and use of information
        submitted or collected during your use of our Services, as defined herein below, on this website and/or any related mobile or other applications.</p><br/>

        <p style={{color:'white'}}>Your use of the website operates as express consent to the practices and processes explained in this Privacy Policy (Policy) and our related <a href='/terms&condition'>Terms and Conditions.</a> ResumeNerd operates an online resource to enable users to create resumes, cover letters and make important decisions regarding their careers and future plans (“Services”). Although we pride ourselves in the quality of our Services, we cannot guarantee employment for any user of our services. We also cannot guarantee that an employer will find qualified candidates through our Services.</p><br/>
        <p style={{color:'white'}}>Your data Controller is AS Global SoftTech</p>
       </div>

       <div>
         <h2><strong>1. Information Collected</strong></h2>
         <p>When you use our Services, you share certain personal information with us, including but not limited to your name, e-mail address and home address, mobile number, and/or credit card information). Additionally, you may provide us with other personal information at your discretion, and as needed in your use of the Services. The information we collect may be combined with information from outside public records (for example, demographic information, navigation information, additional contact information) that we have acquired in accordance with the law. We collect information from you in the following ways. <br/><br/>

</p>
           <ul>
            <li><b>Registration, Product, Services and Account Information:  </b></li>
                <p>You can anonymously browse our website and services. The creation of an account with us or the use of particular services may require that you furnish certain information and will no longer be anonymous. Once you create an account you will be able to upload documents in our system as part of the resume and cover letter creation. Your personal information will remain stored as long as you have an account. If you wish to have access to edit, print, and download your documents you will need to subscribe to any of our great offers.</p><br/>
            <li><b>Technical Usage Information:</b></li>
            <p>Depending on your country of residence, by visiting our website, ResumeNerd may collect usage information relayed by your computer, mobile or other device to show how you have been utilizing our website and services. We may use tracking technologies to manage and collect this information. These technologies include cookies, web beacons/GIFs and embedded scripts as described in our Cookies and Tracking Technologies policy. These tracking technologies may be used as an operational necessity (functional cookies), for performance and web analytics, for functionality and for targeting purposes (marketing cookies). We may also collect password information from you when you log in, as well as computer and/or connection information. During some visits we may use software tools to measure and collect session information, including page response times, download errors, time spent on certain pages and page interaction information.</p><br/>
           <p>If you are an EU resident or live in a country where privacy laws have imposed cookie restrictions, when you first visit ResumeNerd you should be prompted to set your cookie preferences. These may be changed at any time by login into your Account settings. Please contact our customer support team if you have any questions.</p>
            </ul>      
            </div><br/>
<div>
    <h2><strong>2. US State Resident Privacy Rights</strong></h2>
<ul>
    <li><p>Depending on where you live in the US, some states have enacted privacy laws that contain provisions similar to All the specific information provided in this section applies to consumers who are residents of California as well as residents of other states where similar privacy laws have been enacted. The rights available to you will depend on the laws of the state where you live. we are required to provide certain information to California residents about how we handle certain personal information collected by us online or offline</p></li><br/>
    <li><p>“Personal Information”, is any information that identifies, relates to, describes, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or household, including the categories identified in the table below to the extent they identify, relate to, describe, are capable of being associated with, or could be reasonably linked, directly or indirectly, with a particular consumer or household.</p></li><br/>
    <li><p>We may collect and disclose for a business purpose the personal information in the table below. The table below does not address our handling of personal information that is subject to an exemption under applicable state law.</p></li><br/>
</ul>

</div>
      <div>
      <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>Categories of Personal Information</th>
          <th>Description</th>
          <th>Collect?</th>
          <th>Disclose for Business Purpose?</th>
          <th>Sell?</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td><p>{item.category}</p></td>
            <td><p>{item.description}</p></td>
            <td><p>{item.collect}</p></td>
            <td><p>{item.disclose}</p></td>
            <td><p>{item.sell}</p></td>
          </tr>
        ))}
      </tbody>
    </table>
      </div><br/>
      <div>
        <ul>
            <li>
               <p> <b>Third-Party Analytics:</b>As part of the Site we can work with third parties to provide advertisement, data collection, reporting, ad response measurement, site analytics and assist with delivery of relevant marketing messages and advertisements. These third parties can view, edit or set their own tracking technologies/cookies. The use of these technologies by these third parties is subject to their own privacy policies and is not covered by this Privacy Policy. They can also obtain information about other applications that you have downloaded to your mobile device, the mobile websites you visit and other information about you or your device in order to analyze and serve anonymous targeted advertising on the Site and elsewhere. For more information about third party ad servers at our Site and your ability to opt-out of targeted advertising from such third parties, please visit https://www.a2zsheleter.com/ which provides information about certain companies that we can be using to serve advertising on our Site.</p>
            </li><br/>
            <li><p><b>Site access through mobile devices:</b>If you access the Site through a mobile device or app, we can also share your information with Carriers, operating systems and platforms. We retain Personal Information for as long as it is necessary to fulfill the purpose(s) for which it was collected, our business purposes and/or to comply with the applicable laws, and your consent to such purpose(s) remains valid after termination of our relationship with you. You consent to our retention of your video viewing tracking data for as long as permissible under applicable law – up to one year after you close your account or otherwise withdraw consent for video tracking</p></li><br/>
            <li><p>US state privacy laws grant consumers certain rights and imposes limitations on particular business practices as explained below. The rights available to you will depend on the laws in the state where you live.</p></li>
        </ul>
        <p><b>Do-Not-Sell or Share my Personal Information.</b> Under the CCPA, all California consumers have the right, at any time, to direct a business that sells or shares personal information about them to third parties not to sell or share their personal information. For ResumeNerd to provide our service we may share your personal information with service providers or third parties. This helps us improve our offering, create a better experience, and provide you with additional tools in your career building journey. Since the CCPA CPRA, and other applicable US state privacy laws define sharing broadly, in some cases the sharing of information may be considered a sale. That is why we have included a “Do Not Sell or share my Info.” button on the footer of our main page. You can also make a request by clicking here. We will need to validate your information and if the request is being made through an agent, we will need to confirm their identity and their agent status.</p>
      <p>Residents of states with similar provisions, please note that we will also honor your request to Do Not Sell or Share my Personal Information, in compliance with applicable privacy regulations.</p>
      
      </div>

<p><b>Requests for Copy, Correction,Deletion and Right to Know.</b>As a US resident in a state with privacy laws. subject to certain exception, you have the right to make the request below at no charge twice every 12 months.</p><br/>
<ul><p>
        {rights.map((right, index) => (
          <li key={index}>
            <span role="img" aria-label="check mark">✔</span> <strong>{right.title}</strong>: {right.description}
          </li>
        ))}</p>
      </ul>

      <div><br/>
      <h4>Sending a Request</h4>
      <p>
        You can submit a copy, correction, deletion, and right-to-know request online by sending a request through your 
        account by clicking <a href="#">here</a> if you have an account with us, by sending an email to 
        <a href="mailto:asglobalsofttech23@gmail.com"> asglobalsofttech23.com</a>, or by contacting us at the toll-free 
        number in Help.
      </p><br/>

      <h4>Incentives and Discrimination</h4>
      <p>
        Various US state laws prohibit businesses that collect and handle consumer’s personal information from discriminating 
        against them for exercising their rights under the applicable state privacy laws. California’s CCPA and similar privacy 
        laws impose requirements in connection with any financial incentives offered to California or residents of states with 
        applicable privacy laws, related to their personal information. Specifically, businesses can offer different prices, rates, 
        or quality of goods or services if the incentive is reasonably related to the value of the consumer’s data.
      </p>
    </div>
<h2>3. Accessing, Reviewing, and changing Your Personal Information</h2>
<p>As a registered member you have access to see and change your Personal Information at any time by accessing your account on the Site (through the My Account and My Settings tabs). Be sure to always update your information if any changes have been made. Even when changes are made, we may retain some information from closed accounts so that we can comply with law, prevent fraud, assist with investigations, resolve disputes, analyze or troubleshoot programs, enforce our Terms of Use, or take other actions permitted by law. This will also happen if your account or membership is terminated or suspended. We can maintain some information to prevent re-registration. For non-registered members, you can update or request to access your Personal Information by contacting us.</p><br/>
<p>Your requests will be responded as soon as reasonably possible but please note that changes requested of us are not always effective immediately. Unless required by law, we are not responsible for informing third parties (including without limitation our third party service providers, potential employers, job-posting sites you authorize us to contact on your behalf, or strategic or marketing partners) with whom we have already shared your information of any changes requested pursuant to this section, or for removing information from or causing information to be removed from the databases or records of such entities.</p><br/>

<h2>4. Information You Share on the Site, Public Information.</h2>
<ul><p>
    <li>There may be information that becomes public by using any of the ResumeNerd services (i.e., resume sharing, profile creation, Job Alerts) that permit you, or ResumeNerd on your behalf, to post information on third party sites (i.e., websites, bulletin boards, personal urls). Also, by posting information or content, such as by posting photos, or participating in online forums or communities, when you interact with our Site through social media sites, plug-ins or other applications, depending upon your privacy settings, this information can become public on the Internet. Once the information is public, we are unable to stop further use of this information. You will have to control this by accessing the privacy settings of each media site.</li><br/>
    <li>A universal application may be created from the information you provide on the Site and it will be visible to potential employers as well as visitors to the Site this information will be available as your contact information. You have an option to restrict the visibility of this information only to registered users by following the instructions on the Site. You agree that employers or Provider may use your contact information to contact you by email and/or SMS text. This consent is not a condition to having access to the Site or Provider services.</li><br/>
</p></ul><br/>
<div>
<h2>5. Privacy Preferences</h2>

      <h5>Opting Out of Promotional Messages</h5>
      <p>
        You can choose not to receive our promotional communications by clicking the “My Account” tab and clicking the “My Settings” 
        and “Preferences” tabs. You can also click the unsubscribe link in the footer of any e-mail or newsletter you receive. 
        You can also e-mail us at <a href="mailto:asglobalsofttech23@gmail.com">asglobalsofttech23@gmail.com</a>.
      </p>

      <h5>SMS Alerts</h5>
      <p>
        If you opt-in to our SMS alert service, you acknowledge that message or data charges may apply. If you wish to not 
        continue with the SMS alert service, you may opt-out by replying “STOP” to the SMS text you received or contact our 
        customer service. Please allow 3 to 5 business days to process your request. Provider reserves the right to terminate 
        at its sole discretion the SMS alert service for any reason at any time.
      </p>

      <h5>Administrative Messages</h5>
      <p>
        As Provider provides an on-line service you cannot opt-out of administrative e-mails (for example, e-mails about your 
        transactions or policy changes) for your registered account.
      </p>

      <h5>Deletion of Your User Content/Account</h5>
      <p>
        You can request that we delete your account by logging into your account and clicking the “My Settings” and “Overview” tab. 
        You can also e-mail us at <a href="mailto:asglobalsofttech23@gmail.com">asglobalsofttech23.com</a>. When you request that your 
        account be deleted, your Personal Information, including your resume and profiles, will be deleted and no longer available 
        to you or visible to users from Provider Applications. However, if any of your information, including your Personal 
        Information, was previously accessed by others using Provider Applications, we are unable to delete the information from 
        their systems. When you delete your information on Provider Applications, we will retain logs and non-personally 
        identifiable information about you, along with an archival copy of your information, which is not accessible by you or 
        third parties on Provider Applications but might be used by us for recordkeeping and internal purposes, including 
        enforcing this Policy and demographic, reporting, and research purposes.
      </p>

   
      <p>
        EU residents please also refer to Section 9 regarding further rights afforded under GDPR.
      </p>
    </div>
    <div>
        <h2><b>6. Third Parties</b></h2>
        <p>Our Services and website may contain links to third party websites. ResumeNerd may also provide products and services that share information with third parties in order to aid you in your job search. ResumeNerd will not be responsible for the privacy processes and the content of these third party websites. Please take the time to read and understand their privacy policies and terms before providing third parties’ any information</p><br/>
        <p>When you link your account or engage with our Site through third-party network (“TPN”) accounts, you understand that you may be allowing us to have ongoing access to certain information stored on those TPN accounts (e.g., your social networking credentials, your public profile, friend list, photos, people you follow or who follow you, your email address, birthday, work history, education history, interests, current city, religious and political views, website, personal description, and likes, and your friends’ birthdays, education histories, personal descriptions and likes). We may also receive other information (e.g., content viewed and information about the advertisements within the content you have been shown or may have clicked on, etc.) from your interaction with our Site.</p><br/>
        <p>The information we have access to from the TPN accounts varies by service and is controlled by your privacy settings on that service and by your consent. Information that may be passed to analytics providers and advertising partners may be via cookies and tracking technologies. By associating an account managed by a third party with your ResumeNerd account and authorizing us to have access to this information, you agree that we may collect, use, and store information from these websites in accordance with this Privacy Policy. You agree that we may share your video viewing with or obtain information about your video viewing from analytics providers and advertising partners, third-party partners and social media sites for two years or until you withdraw your consent.</p><br/>
    </div><br/>
    <div>
        <h2><b>7. Storage and Security Measures</b></h2>
    <p>ResumeNerd strives to maintain technical, physical and administrative security measures to ensure the protection and security of your personal information against any loss, misuse, unauthorized access, disclosure, copying or use. However, no method of transmission over the Internet or method of electronic storage is totally secure. Therefore, we cannot guarantee its absolute security. These measures include, but are not limited to, firewalls, physical access controls to data centers and access authorization codes. It is your responsibility that the information you have provided is accurate</p><br/>
    <p>As we operate internationally, and many of our computer systems are currently based globally, for the purposes set out in this Privacy Policy your Personal Information can be stored and processed elsewhere by us, our affiliates or an unaffiliated service provider. The data protection and privacy regulations do not always offer the same level of protection as in other parts of the world, such as the European Economic Area (“EEA”). When you create an account/profile or otherwise provide us with Personal Information, you consent to the collection, storage and/or processing of your Personal Information in the United States, Canada and other countries of your Personal Information and tracking technologies/cookies as described in this Privacy Policy. We take appropriate measures to ensure adequate protection of the privacy rights of EEA data subjects with respect to Personal Information that we transfer outside the EEA to a country that is not subject to an adequacy decision by the EU Commission. In these cases, we will sing a Data Processing Agreement that includes Standard Contractual Clauses in order to safeguard your data. To obtain a copy of the relevant transfer mechanism or additional information on the transfers</p><br/>
    </div>

    <div>
      <h2><b>8. Notice to Residents of the European Union</b></h2>
      <p>
        ResumeNerd complies with the General Data Protection Regulation (“GDPR”). As such, ResumeNerd affords to all European 
        data subjects their respective data privacy rights to the extent they are applicable including:
      </p><br/>
      <ul>
        <p>
        <li>(i)     Right to rectify inaccurate data;</li>
        <li>(ii)    Right to erasure (deletion of your Personal Information);</li>
        <li>(iii)   Right to restrict processing of your Personal Information;</li>
        <li>(iv)    Right of data portability;</li>
        <li>(v)     Right to object.</li>
      <li>
      
        You can exercise any of these rights by contacting us at <a href="mailto:asglobalsoftech23@gmail.com">asglobalsoftech23@gmail.com</a> or 
        by visiting our<a href="/contact-us">Contact Us</a> page. In order to safeguard your Personal Information from 
        unauthorized access, we may ask that you provide sufficient information to identify yourself prior to providing access 
        to your Personal Information.
      </li>
        <li>(vi)    Right to withdraw consent</li>
        <li>(vii)   Right to access a copy of your personal data</li>
      </p></ul><br/>
      <p>
        You can exercise any of these rights mentioned above by sending an email to <a href="mailto:asglobalsoftech23@gmail.com">asglobalsoftech23@gmail.com</a> 
        or by contacting our customer care team by any of the means provided on our <a href="/contact-us">Contact Us</a> page.
      </p>
      <p>
        GDPR also affords you a right to lodge a complaint with the competent data protection supervisory authority. You can file 
        this complaint both at your place of residence, at your place of work, or at the place of the data protection breach you are 
        complaining about.
      </p><br/>

      <p>
        Our EU representative for GDPR purposes is DPO Centre Europe Ltd, with address at Alexandra House 3 Ballsbridge Park 
        Dublin, D04C 7H2 Ireland. You can exercise your rights through our representative by sending an email to 
        <a href="mailto:legal@spectertechnologies.com"> legal@spectertechnologies.com</a>. We have also appointed a Data Protection Officer 
        that can be reached by sending an email to <a href="mailto:dpo@spectertechnologies.com">dpo@spectertechnologies.com</a>.
      </p><br/>

      <p>
        In certain situations, and subject to applicable law, ResumeNerd will not be able or obliged to comply with part or all of 
        your individual requests. Please note that we have the right to refuse and/or charge a monetary fee for requests which are 
        manifestly unfounded or excessive, for example due to their repetitive character. If you have unresolved concerns, you have 
        the right to complain to an EU Supervisory Authority.
      </p><br/>

      <p>
        Providing your information to us is optional, but it can impact our ability to offer the Service to you. For example, if you 
        do not provide your complete Personal Information, we will not always be able to respond to your request in a timely manner.
      </p>
    </div>
    <div>
       <h2><b>9. Use, Retention and Sharing of Information; Marketing</b></h2>
       <h6>(a) Use and Retention</h6>
      <p>
       i.        We use the personal information we collect, including email accounts you might create on our platform, to:
      </p><br/>
      <ul>
        <p>
        <li>1.  Respond to your questions and requests;</li><br/>
        <li>2.  Provide customer service;</li><br/>
        <li>3.  Personalize your experience by providing content on the Site, including targeted advertising;</li><br/>
        <li>4.  Improve the Site;</li><br/>
        <li>5.  Provide you with a safe, efficient, and customized experience;</li><br/>
        <li>6.  Contact you to maintain the Site, your account, or to comply with your stated communication preferences, or to provide other products or services requested by you, as described at the time when we collect the information from you, or to contact you for other purposes authorized by law;</li><br/>
        <li>7.  Prevent, detect, and investigate fraud, security breaches, and potentially prohibited or illegal activities, and enforce our User Agreement;</li><br/>
        <li>ii. Use aggregate information about our users and non-personal information to analyze Site and user behavior and prepare aggregated reports;</li><br/>
        <li> iii.   If you have chosen to participate in some of our career building Services, the information you share with us may be provided to third parties including, but not limited to, resume editors, employers, or recruiters who might contact you about career opportunities, employers seeking candidates, and/or other career service providers;</li><br/>
        <li>iv. When you access the Site on a mobile device, with your consent obtained through your use of the Site, we may use the information collected for any purpose set forth in this Privacy Policy. For example, we may use this information to provide you with location-based services, such as advertising, search results, and other personalized content.</li><br/>
        <li>v.  We retain personal information for as long as it is necessary to fulfill the purpose(s) for which it was collected and to comply with applicable laws, and your consent to such purpose(s) remains valid after termination of our relationship with you. You consent to our retention of your video viewing tracking data for as long as permissible under applicable law – up to one year after you close your account or otherwise withdraw consent for video tracking.</li><br/>
      </p></ul>

      <h6>(b) Who We Share Information With</h6>
      <p>
        The information that you provide to ResumeNerd might be shared with:
      </p><br/>
      <ul><p>
        <li>1.  Service providers and other third parties;</li><br/>
        <li>2.  Our affiliates and subsidiaries;</li><br/>
        <li>3.  Ad networks;</li><br/>
        <li>4.  Companies in the Mobile App Industry;</li><br/>
        <li>5.  Other entities with your consent;</li><br/>
        <li>6.  New owners;</li><br/>
        <li>7.  Analytics providers;</li><br/>
        <li>8.  Legal and law enforcement.</li><br/>
      </p></ul>
    </div>
    <p>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.category}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.description}</td>
            </tr>
          ))}
        </tbody>
              </table></p><br/>
              <p>Also, if there is any information that we believe could lead to possible illegal, fraudulent activity or is a potential threat to safety or in violation of our user Agreement or Privacy Policy, it might be disclosed.</p><br/>

    
      <h6>(c) Marketing Communications</h6><br/>
      <p>If you prefer not to receive marketing communications you may op-out by clicking on the “My Account” tab and clicking “My Settings” and “Preferences”, you may not opt-out of administrative emails (for example, emails about your transactions or policy changes). You may also click the unsubscribe link in the footer of any email or newsletter you receive for your registered account.</p><br/>
      <p>We do not sell or rent your personal information to third parties for marketing purposes without your consent. We may combine your information with information we collect from other companies and use it to improve and personalize the Site.</p><br/>

<h2>10.Notification Regarding Updates.</h2>
<p>From time to time, we can choose to update this Privacy Policy. The Privacy Policy posted at any time or from time to time via this Site shall be deemed to be the Privacy Policy then in effect. You agree that we can notify you about material changes in the way we treat Personal Information by placing a notice on the Site. You should check the Site frequently for updates.</p><br/>


<h2>11.Privacy Rights of Children</h2>
<p>
        ResumeNerd owns and operates a general audience site that is not intended for use by children under the age of 16. However, if local laws provide for an alternative minimum age for ResumeNerd to lawfully provide the services on the Site to you, then that shall apply as the applicable minimum age.
      </p>
      <p>
        We do not knowingly collect information from this age group through our websites and services. If you are a minor and wish to remove the information you posted on this site, please contact us at <a href="mailto:legal@resumenerd.com">legal@resumenerd.com</a>.
        Although we will remove this information from our service and system, we cannot ensure its complete and comprehensive removal.
      </p>
      
      <h3>Contact Information</h3>
      <ul>
        <li>
          <strong>Email:</strong> <a href="mailto:asglobalsofttech23@gmail.com">asglobalsofttech23@gmail.com</a>
        </li>
        <li>
          <strong>Contact: </strong><p>+91**********</p> 
        
        </li>
      </ul>



    </div>
  )
}

export default Privacy