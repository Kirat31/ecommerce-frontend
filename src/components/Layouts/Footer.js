// components/Footer.js
import {Typography} from '@mui/material';

const styles = {
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#f5f5f5', // Optional: Add a background color
    padding: '1rem', // Optional: Add padding to the footer
  },
};

function Footer() {
  return (
    <footer>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Ecommerce App. All rights reserved.
      </Typography>
      {/* Add more links, social media icons, etc. */}
    </footer>
  );
}

export default Footer;
