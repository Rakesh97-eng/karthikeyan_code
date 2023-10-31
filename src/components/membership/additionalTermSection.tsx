import { AdditionalTermsContainer } from './styles';
import { Typography } from '@mui/material';

const AdditionalTermSection = () => {
  const ADDITIONAL_CONTENTS = [
    {
      id: 1,
      title:
        '1. CONSUMER’S RIGHT TO CANCELLATION: YOU MAY CANCEL THIS CONTRACT WITHOUT ANY PENALTY OR FURTHER OBLIGATION WITHIN THIRTY (30) DAYS FROM THE AGREEMENT DATE.',
      content:
        'Notice of cancellation shall be in writing or email by the Member and mailed by registered or certified United States mail to Heyday at: PO Box #1529 at 149 E 23rd St NY, NY 10159 or members@heydayskincare.com. At any time during the term of the Membership, you may cancel with 30 days written notice. Accumulated discounted First Facials expire after 90 days of Membership cancellation.',
    },
    {
      id: 2,
      title: '2. MEMBER’S HEALTH WARRANTY AND ACCURACY OF INFORMATION:',
      content:
        'You represent that you are in good health and have no disability, impairment, injury, disease or ailment preventing you from engaging in Services with Heyday. You assume full responsibility for your use of the Heyday facility and shall indemnify Heyday Wellness LLC, the owner of the Heyday location you are utilizing, its affiliates, agents and employees against any and all liability arising out of your use of the facilities.',
    },
    {
      id: 3,
      title: '3. TRANSFERS OF MEMBERSHIP:',
      content:
        'Membership may not be transferred but you may share your Membership benefits with others, as described above.',
    },
    {
      id: 4,
      title: '4. MEMBER’S OBLIGATIONS:',
      content:
        'You shall not be relieved of your obligations to make payments agreed to, and no reduction in any payments due shall be made because of your failure to use Heyday’s services. You must abide by late cancel/no show policies and all fees will be charged to the debit or credit card on file.',
    },
    {
      id: 5,
      title: '5. ENTIRE AGREEMENT:',
      content:
        'Except for the rules, regulations and schedules posted at Heyday or issued orally by Heyday from time to time at its discretion, all of which are incorporated into this agreement, this contract constitutes the entire and exclusive agreement between the parties relating to the subject matter hereto and supersedes any oral or other written understanding. This contract may be modified only in writing executed by a duly authorized representative of Heyday. Employees are not authorized to make any independent agreements with any Members and/or Buyers.',
    },
    {
      id: 6,
      title: '6. UNPAID BALANCES: ',
      content:
        'Members will not be permitted to use any Heyday location until all monthly fees are paid as agreed. You or Buyer, as applicable, is obligated to pay any collection and/or legal costs incurred by Heyday for collection of any fees. Heyday reserves the right to charge balances and overdue balances to the any account you or Buyer has designated for payment under any pre-authorization. To the extent that Member and Buyer are not the same person, Buyer shall be obligated to make all payments that Member fails or has failed to make (including past and future payments for use of Heyday).',
    },
    {
      id: 7,
      title: '7. VALUABLES AND PERSONAL PROPERTY:',
      content:
        'Heyday shall not be liable for the loss of or theft of, or damage to, your personal property. You release Heyday of any and all claims, demands, suits, complaints, causes of action or any liability for loss, stolen or damage to your personal property while on the premises. Storage of illegal substances, firearms, and toxic or volatile chemicals is prohibited and punishable by law.',
    },
    {
      id: 8,
      title: '8. MEMBERSHIP FREEZE POLICY:',
      content:
        'Members may not freeze their memberships. If upon a doctor’s order, you cannot physically receive the Services because of significant physical disability, you may submit a cancellation request per the instructions noted above in Section 1.',
    },
    {
      id: 9,
      title: '9. TERMS OF SALE:',
      content: 'All sales of service sessions are final and non-refundable.',
    },
    {
      id: 10,
      title: '10. PRICING: ',
      content:
        'Heyday reserves the right to change the pricing of Services and the Member benefits and will provide thirty (30) days’ notice to all Members regarding any such change in pricing and/or benefits.',
    },
    {
      id: 11,
      title: '11. REVOCATION OF MEMBERSHIP:',
      content:
        'Heyday reserves the right to revoke and cancel this Membership at any time for any reason, in which case you will, no later than fifteen (15) days after such cancellation, receive a refund of all monies paid pursuant to this Agreement, provided that Heyday may retain expenses incurred or the portion of the total price of this Agreement representing the services you used or completed, and provided further, that Heyday may demand the reasonable cost of goods and services which you consumed or wish to retain after cancellation.',
    },
    {
      id: 12,
      title: '12. WAIVER OF LIABILITY:',
      content:
        'YOU AGREE TO ASSUME, TO THE MAXIMUM EXTENT PERMITTED BY LAW, FULL RESPONSIBILITY FOR YOUR USE OF THE FACILITY AND HEREBY RELEASE HEYDAY FROM ANY AND ALL LOSS, THEFT, CLAIM, INJURY, DAMAGE, OR LIABILITY, INCLUDING CLAIMS CAUSED IN WHOLE OR IN PART BY THE NEGLIGENCE OF HEYDAY, ITS AFFILIATES, AGENTS, OR EMPLOYEES. YOU FURTHER AGREE THAT HEYDAY, THE OWNER OF THE RETAIL LOCATION YOU ARE UTILIZING, ITS AFFILIATES, AGENTS AND EMPLOYEES SHALL NOT BE LIABLE ON ANY THEORY OF LIABILITY FOR ANY SPECIAL, INDIRECT, CONSEQUENTIAL OR PUNITIVE DAMAGES (INCLUDING ANY LOSS OF PROFITS, BUSINESS OR ANTICIPATED SAVINGS), ARISING OUT OF, IN CONNECTION WITH OR AS A RESULT OF THE TRANSACTIONS CONTEMPLATED HEREBY, WHETHER SUCH DAMAGES ARISE IN CONTRACT, WARRANTY, NEGLIGENCE, TORT, UNDER STATUTE, IN EQUITY, AT LAW OR OTHERWISE. FURTHER, YOU SHALL INDEMNIFY, DEFEND, AND HOLD HARMLESS HEYDAY, THE OWNER OF THE RETAIL LOCATION YOU ARE UTILIZING, ITS AFFILIATES, AGENTS AND EMPLOYEES AGAINST ANY AND ALL LIABILITY ARISING OUT OF YOUR PRESENCE AT OR USE OF THE FACILITIES.A. For the purposes of this section, “Presale Contract” means a Membership Agreement that is signed prior to the Membership location official opening and Services being available to the Member.',
    },
    {
      id: 13,
      title: '13. PRESALE CONTRACT CANCELLATION PROVISIONS:',
      content: '',
      listItems: [
        'A. For the purposes of this section, “Presale Contract” means a Membership Agreement that is signed prior to the Membership location official opening and Services being available to the Member.',
        'B. Presale Contract Members shall have the right to cancel this contract for any reason at any time prior to midnight of the third business day after the date on which the first Service under the contract is available. The date on which the first Service under the contract is available is the Membership Charge Date as defined above and upon which Services are available to any Founding Member and the three (3) business day period shall be defined as the “Presale Termination Period.”',
        'C. If you cancel within the Presale Termination Period, Heyday will fully refund any charges paid, less any discounts redeemed, within thirty (30) days of receipt of your cancellation notice.',
        'D. Any termination made prior to store official opening must be made in writing by sending an email to the Heyday location email listed on the website or to members@heydayskincare.com. That email must include your name, your address, the last four digits of the payment method used to pay for the Membership, the date the Presale Contract was signed and a statement that you wish to cancel your Presale Contract. You understand that should you fail to comply with this section, your Membership will not be considered cancelled and you will be billed pursuant to the agreed-upon terms above until such cancellation provisions are completed.',
      ],
    },
    {
      id: 14,
      title: '14. CHANGES:',
      content:
        'We have the right to change or add to the terms of this Agreement at any time, solely with prospective effect, and to change, delete, discontinue, or impose conditions on use of the Services by posting such changes on our website or any other website we maintain or own. We will provide you with notice of any changes via email, or through other reasonable means. For existing Members, the changes will come into effect 10 days after we post the changes to our website, and your use of the Services more than 10 days after we publish any such changes on our website, constitutes your acceptance of the terms of the modified Agreement. You can access a copy of the current terms of this Agreement on our website at any time. You can find out when this Agreement was last changed by checking the “Last updated” date at the top of the Agreement.',
    },
  ];
  return (
    <AdditionalTermsContainer>
      <Typography variant='h3'>Additional Terms</Typography>
      {ADDITIONAL_CONTENTS.map((list) => {
        return (
          <div className='list-wrapper' key={list.id}>
            <Typography variant='body1'>
              <Typography
                variant='body1'
                fontWeight={600}
                className='list-title'
              >
                {list.title}
              </Typography>
              {list.content}
            </Typography>
            {list.listItems?.map((item) => {
              return (
                <Typography key={'item'} variant='body1' className='list-item'>
                  {item}
                </Typography>
              );
            })}
          </div>
        );
      })}
    </AdditionalTermsContainer>
  );
};
export default AdditionalTermSection;
