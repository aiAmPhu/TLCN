const Footer = () => {
  return (
    <footer className="bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Logo and Contact Info */}
          <div>
            <img
              src="../../public/logohcmute.png"
              alt="HCMUTE Logo"
              className="w-32 mb-4"
            />
          </div>

          {/* Subscribe and Social */}
          <div>
            <h3 className="font-bold text-blue-600 mb-2">Liên Hệ Tuyển Sinh</h3>
              <p>Hội Đồng Tuyển Sinh Trường ĐH Sư Phạm Kỹ Thuật TP.HCM</p>
              <p>Phòng Tuyển Sinh & Công Tác Sinh Viên - Phòng Đào Tạo</p>
              <div className="mt-2 flex items-center">
                <span className="material-icons mr-2">Địa chỉ:</span>
                01 Võ Văn Ngân, Q.Thủ Đức, TP.HCM
              </div>
              <div className="mt-2 flex items-center">
                <span className="material-icons mr-2">Phone</span>
                (028) 3722 5724 - (028) 3896 1333
              </div>
              <div className="mt-2 flex items-center">
                <span className="material-icons mr-2">Email</span>
                tuyeninh@hcmute.edu.vn
              </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-blue-200 pt-4 text-center">
          <p className="text-sm text-gray-600">
            Copyright © 2017 SOFTWARE TECHNOLOGY CENTER - HCMUTE. All right reserved.
          </p>
          <p className="text-sm text-gray-600">
            HOTLINE TƯ VẤN TUYỂN SINH: (028) 3722 5724
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
