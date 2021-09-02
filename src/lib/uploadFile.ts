import { unlink } from "fs";

export async function deleteFile(payload: any, res: any) {
    try {
        unlink('./file/' + payload, function (err) {
          if (err) {
            return res.status(500).send({ status: 500, message: 'Gagal delete file karena file tidak ada' });
          }
          else {
            return res.status(200).send({ status: 200, message: 'Sukses delete file' });
          }
        })
    } catch (err) {
        console.log(err)
    }
}