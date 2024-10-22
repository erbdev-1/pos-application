import { Button, Modal } from "antd";

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  return (
    <Modal
      title="Print Invoice"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      {/* CREATE BILL TEMPLATE*/}
      <section className="py-20 bg-custom">
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">
                TECH EDUCATORS
              </h2>
            </div>
            {/*Bill Details-Invoice No,Date.... */}
            <div className="bill-details">
              <div className="grid grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Invoice Detail:</p>
                  <p> The Bradfield Centre 184</p>
                  <p> Cambridge Science Park Milton Road </p>
                  <p>Cambridge, CB4 0GA</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">
                    Company/Personal Details:
                  </p>
                  ------------
                  <p> -----------</p>
                  <p> -------- </p>
                  <p> --------</p>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">Invoice No:</p>
                    <p>000{Math.floor(Math.random() * 100)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">Date:</p>
                    <p>{customer?.createdAt.substring(0, 10)}</p>
                  </div>
                </div>
              </div>
            </div>
            {/*Table of Products*/}
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      {" "}
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Quantity/Weight
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-end text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody key={"bill-items"}>
                  {customer?.cartItems.map((item) => (
                    <tr className="border-b border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={item.img}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Unit Price £ {item.price}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Unit Price £ {item.price}₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>£ {item.price.toFixed(2)} </span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(item.price * item.quantity).toFixed(2)}₺</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right pt-6" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">
                        Sub Total
                      </span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        £ {customer?.subTotal}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">TAX</span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        +£ {customer?.tax}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">Total</span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        £ {customer?.totalAmount}
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Payment terms are 14 days. Pass on Unpackaged Debts
                    According to the Payment Act 0000, freelancers are entitled
                    to 00.00 late fee if debts are not paid after that they have
                    the right to demand and at this point Please note that a new
                    invoice will be presented additionally. If the revised
                    invoice is not paid within 14 days, the due date additional
                    interest on past account and 8% legal rate plus 0.5% Bank of
                    A total of 8.5% will be applied, including the England base.
                    Parties cannot make a contract outside the provisions of the
                    Law.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large">
          Print
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
