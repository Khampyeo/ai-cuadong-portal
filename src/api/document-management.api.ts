import { IDocument } from "@/interfaces/document.interface";
import { IResponseListEntity } from "@/interfaces/response.interface";

export const getDocument: () => Promise<
  IResponseListEntity<IDocument>
> = async () => {
  const response: IResponseListEntity<IDocument> = {
    status: 200,
    data: {
      data: [
        {
          id: "61a8c6a3-edc6-476c-9542-4d870cf6ef89",
          scope: "fso all",
          label: "ssc",
          path: "topic",
          category: "ssc",
          content:
            "# Thông tin để trả lời các vấn đề về: Hướng dẫn quy trình hủy, đăng ký xe OT\nBạn vui lòng xem hướng dẫn tại link sau: https://fptsoftware362.sharepoint.com/:i:/r/sites/Maya/Shared%20Documents/CR%20-%20Campus/H%C3%B2a%20L%E1%BA%A1c/OM/Quy%20tr%C3%ACnh%20%C4%91%C4%83ng%20k%C3%BD,%20h%E1%BB%A7y%20xe%20OT.jpg?csf=1&web=1&e=pTH3Gi'\n\n`\n> tham khảo hình ảnh *pam.png* là rất quan trọng để có thể thực hiện quy trình hủy, đăng ký xe OT\n`\n",
          language: "vi",
          source: "",
          creator: "synt1@fpt.com",
          status: "Active",
          company_name: "fsoft",
          hr_page: 1,
          doc_type: "qna",
          document_name: "Hướng dẫn quy trình hủy, đăng ký xe OT",
          create_date: "2024-06-14T02:16:34.199Z",
          published_date: "2024-04-02T00:00:00Z",
        },
        {
          id: "2f3f4363-affa-4c87-9c26-d77b59765565",
          scope: "fso vn",
          label: "workplace",
          path: "event",
          category: "event",
          content:
            "Let kick off\n\nFPT Software sẽ mở văn phòng thứ 16 tại Châu Âu tại thành phố Nürnberg. Tuần qua, Phó TGĐ FPT Phạm Minh Tuấn thăm và làm việc tại châu Âu và Trung Đông, FPT Slovakia mở rộng hợp tác cùng Kosice IT Valley, FEU và DXG ký thỏa thuận trị giá 1,6 triệu euro với Daimler, FJP.NVI và FHM quyết định nâng cấp MEICOM thành mega account, và FPT Korea mở rộng hợp tác cùng Đại học hàng đầu Hàn Quốc. [#131newsroom]\n`\n> tham khảo hình ảnh *pam.png* là rất quan trọng để hiểu rõ hơn về sự kiện let kick off này nhé.\n`\n",
          language: "vi",
          source: "",
          creator: "synt1@fpt.com",
          status: "Active",
          company_name: "fsoft",
          hr_page: 1,
          doc_type: "event",
          document_name: "Let kick off",
          create_date: "2024-06-14T02:02:30.144Z",
          published_date: "2024-06-14T00:00:00Z",
        },
        {
          id: "8d8865d5-e06c-4cdc-bdf9-dc166cbbafc9",
          scope: "fso vn",
          label: "qms",
          path: "topic",
          category: "ssc",
          content: "\ngfhg",
          language: "vi",
          source: "",
          creator: "synt1@fpt.com",
          status: "Active",
          company_name: "fsoft",
          hr_page: 1,
          doc_type: "regulation",
          document_name: "Quy định chế độ nghỉ mát",
          create_date: "2024-06-14T01:42:25.491Z",
          published_date: "2024-06-14T00:00:00Z",
        },
      ],
      pageNo: 1,
      pageSize: 10,
      totalPages: 145,
    },
  };
  return response;
};
