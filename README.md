# MWIT Alumni App (Modified)

This repository contains the decompiled and modified source code for the MWITS Offline Alumni Application. 

## Modifications
The application's offline browsing capabilities were enhanced:
- Added a dropdown menu to filter alumni by duty/category (e.g., Head Student, POSN/Olympiad, various medals).
- Extended the `offline-browse.js` filtering logic to query student groups accurately.

## ⚠️ Disclaimer & Precautions

**This project is strictly for educational purposes only.**

- This repository contains source code derived from decompiling the original APK to demonstrate how to implement feature additions in an existing Cordova/WebView application.
- **Personal Information:** Please be aware that the original application data may contain personal information about alumni. Ensure that you do not distribute or misuse any personal data included within the application's offline data files. Handle all data responsibly and respect the privacy of the individuals listed.

## Setup & Build
If you wish to build the APK yourself from this source:
1. Ensure you have [Apktool](https://ibotpeaches.github.io/Apktool/) installed.
2. Build the project:
   ```bash
   apktool b decoded_apk -o output.apk
   ```
3. Sign the APK using `jarsigner` or `apksigner` before installing it on an Android device.

## Acknowledgment
I want to thank you Aj.Komkrit Soontra, professional student affair staff, for this valuable resource.

Thank You for interested in this project.

Pakorn Wongaroon. Vice President of MWIT Student Council 34.

Former Vice President of MWIT Dormitory Student Committee 34.

เนื่องจากเป็นแอปที่ได้รับจากอ.คมกริช สุนทรา ครูหอพักชำนาญการ ซึ่งกระผมรู้สึกควรค่าแก่การเก็บไว้สำหรับศึกษา จึงนำมาเผยแพร่ลง GitHub ให้นักเรียนโรงเรียนมหิดลวิทยานุสรณ์ที่สนใจ ได้ดาวน์โหลดและนำไปพัฒนาต่อ

หากเกิดข้อผิดพลาดประการใด สามารถติดต่อได้
ภากร วงษ์อรุณ รองประธานนักเรียนโรงเรียนมหิดลวิทยานุสรณ์ รุ่น 34
อดีตรองประธานหอพักชาย
