import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type ContactFormState = {
  cardCategory: string;
  issueType: string;
  cardType: string;
  cardProduct: string;
  name: string;
  email: string;
  phone: string;
  cardNumber: string;
  message: string;
};

const initialState: ContactFormState = {
  cardCategory: "一卡通儲值卡",
  issueType: "票卡使用查詢",
  cardType: "一般卡",
  cardProduct: "造型一卡通",
  name: "",
  email: "",
  phone: "",
  cardNumber: "",
  message: "",
};

export default function ContactPage() {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInfo = useMemo(() => {
    if (!files.length) {
      return "未選擇任何檔案";
    }

    return files.map((file) => file.name).join("、");
  }, [files]);

  const updateField =
    (key: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [key]: event.target.value }));
      setErrorMessage("");
      setSuccessMessage("");
    };

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length > 3) {
      setErrorMessage("附件最多可上傳 3 個檔案。");
      return;
    }

    setFiles(selectedFiles);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formState.name || !formState.email || !formState.phone || !formState.message) {
      setErrorMessage("請先完整填寫必填欄位（姓名、電子郵件、聯絡電話、訊息內容）。");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 750);
      });

      setSuccessMessage("表單已送出，我們會盡快以電子郵件與您聯繫。");
      setFormState(initialState);
      setFiles([]);
    } catch {
      setErrorMessage("送出失敗，請稍後再試或直接來信 rd@cloudsyva.com。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section contact surface contact-form-surface">
      <div className="contact-form-header">
        <h1>聯繫我們</h1>
        <p>為提供您迅速確實的服務，請於下方填寫聯絡方式，並詳細描述您所遇到的問題（含相關畫面截圖、錯誤代碼等）。</p>
        <p className="contact-note-mail">
          聯繫信箱：
          <a className="contact-mail" href="mailto:rd@cloudsyva.com">
            rd@cloudsyva.com
          </a>
        </p>
      </div>

      <form className="support-form" onSubmit={handleSubmit}>
        <div className="support-form-grid">
          <label>
            <span>卡片類別</span>
            <select value={formState.cardCategory} onChange={updateField("cardCategory")}>
              <option>一卡通儲值卡</option>
              <option>記名一卡通</option>
              <option>學生證</option>
              <option>企業識別卡</option>
            </select>
          </label>

          <label>
            <span>問題類型</span>
            <select value={formState.issueType} onChange={updateField("issueType")}>
              <option>票卡使用查詢</option>
              <option>加值與退款</option>
              <option>交易紀錄查詢</option>
              <option>異常交易回報</option>
            </select>
          </label>

          <label>
            <span>卡別</span>
            <select value={formState.cardType} onChange={updateField("cardType")}>
              <option>一般卡</option>
              <option>學生卡</option>
              <option>敬老卡</option>
              <option>愛心卡</option>
            </select>
          </label>

          <label>
            <span>卡片產品</span>
            <select value={formState.cardProduct} onChange={updateField("cardProduct")}>
              <option>造型一卡通</option>
              <option>標準一卡通</option>
              <option>一卡通聯名卡</option>
              <option>客製一卡通</option>
              <option>NFC 一卡通</option>
            </select>
          </label>
        </div>

        <label className="support-form-field">
          <span>您的大名*</span>
          <input type="text" placeholder="請輸入您的姓名" value={formState.name} onChange={updateField("name")} />
        </label>

        <label className="support-form-field">
          <span>電子郵件*</span>
          <input type="email" placeholder="請輸入您的電子郵件" value={formState.email} onChange={updateField("email")} />
          <small>若無法收到驗證碼，請改用其他平台的電子郵件信箱。</small>
        </label>

        <label className="support-form-field">
          <span>聯絡電話*</span>
          <input type="tel" placeholder="請輸入聯絡電話（若有分機號碼，請一併提供）" value={formState.phone} onChange={updateField("phone")} />
        </label>

        <label className="support-form-field">
          <span>一卡通儲值卡卡號</span>
          <input
            type="text"
            placeholder="請輸入 11 或 16 碼一卡通儲值卡卡號"
            value={formState.cardNumber}
            onChange={updateField("cardNumber")}
          />
        </label>

        <label className="support-form-field">
          <span>訊息內容*</span>
          <textarea
            placeholder="請輸入訊息內容（若有每日方便聯絡時段，請一併提供）"
            value={formState.message}
            onChange={updateField("message")}
            rows={6}
          />
        </label>

        <div className="support-upload">
          <span>附件上傳</span>
          <input type="file" accept=".jpeg,.jpg,.gif,.png,.pdf,.zip,.7z" multiple onChange={handleFilesChange} />
          <p>{fileInfo}</p>
          <small>系統最多可供您夾帶 3 筆檔案（檔案須為 JPEG、GIF、PNG、PDF、ZIP、7z 格式）</small>
        </div>

        {errorMessage ? <p className="support-message support-message-error">{errorMessage}</p> : null}
        {successMessage ? <p className="support-message support-message-success">{successMessage}</p> : null}

        <div className="support-actions">
          <button className="support-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "送出中..." : "送出表單"}
          </button>
        </div>
      </form>
    </section>
  );
}
