import CustomTable, {ActionSwitch} from "@/components/Utils/CustomTable";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement} from "chart.js";
import {DDMMYYYY} from "@/components/Utils/Formeter";
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const Chart = () => {
  return (
    <div className="col-lg-7 mb-lg-0 mb-4">
      <div className="card z-index-2 h-100 bg-glass">
        <div className="card-header pb-0 pt-3 bg-transparent">
          <h6 className="text-capitalize">Interested people</h6>
          <p className="text-sm mb-0">
            <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
            <span className="font-weight-bold">5 people Interested </span> {DDMMYYYY(new Date().toDateString())}
          </p>
        </div>
        <div className="card-body p-3">
          <div className="chart" style={{height: "300px"}}>
            <Line
              style={{minWidth: 'calc(100vw - 57vw)',minHeight:'calc(100vh - 64vh)'}}
              data={{
                labels: [10, 20, 10, 10, 10, 10],
                datasets: [{
                  label: 'My First Dataset',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                }]
              }}
              options={{maintainAspectRatio: true}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
