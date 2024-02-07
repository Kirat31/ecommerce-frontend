// components/Footer.js
import {Typography} from '@mui/material';

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
