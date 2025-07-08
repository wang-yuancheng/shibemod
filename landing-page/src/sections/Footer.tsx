import InstaIcon from '@/assets/social-insta.svg'
import XIcon from '@/assets/social-x.svg'
import YoutubeIcon from '@/assets/social-youtube.svg'
import LinkedinIcon from '@/assets/social-linkedin.svg'

export const Footer = () => {
  return (
    <footer className='py-5 bg-black text-white/60 border-t border-white/20'>
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="text-center">&copy; 2025 Your Company, Inc. All rights reserved</div>
          <ul className="flex justify-center gap-2.5">
            <li><InstaIcon/></li>
            <li><XIcon/></li>
            <li><YoutubeIcon/></li>
            <li><LinkedinIcon/></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
