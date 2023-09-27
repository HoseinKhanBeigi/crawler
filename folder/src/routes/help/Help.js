import React from 'react';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Help.scss';
import CPCard from '../../components/CP/CPCard';
import Link from '../../components/Link';

class Help extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h2 className={s.title}>راهنما</h2>
        <div className="row margin-b-10">
          <div className="col-md-4">
            <CPCard className={s.help}>
              <Link to="/leads">
                <span className={s.icons}>
                  <Icon type="user" />
                </span>
                <h3>سرنخ</h3>
                <p>
                  به معنی افراد یا شرکت هایی می باشند که ما یک سری اطلاعات خیلی
                  جزئی از آنها در دسترس ما هست و با اقداماتی باید آن ها را به
                  فرصتی برای فروش تبدیل کرد.
                </p>
              </Link>
            </CPCard>
          </div>
          <div className="col-md-4">
            <CPCard className={s.help}>
              <Link to="/opportunities">
                <span className={s.icons}>
                  <Icon type="dollar" />
                </span>
                <h3>فرصت‌ها</h3>
                <p>
                  فرصت به معنی آن است که یک سری لید هایی که پروسه فروش برای آن
                  ها آغاز شده است را فرصت می گوییم. فرصت به معنی آن است که این
                  لید یک فرصت برای فروش محصول ماست.
                </p>
              </Link>
            </CPCard>
          </div>
          <div className="col-md-4">
            <CPCard className={s.help}>
              <Link to="/people">
                <span className={s.icons}>
                  <Icon type="team" />
                </span>
                <h3>افراد</h3>
                <p>
                  افراد به معنی آن است که در حال حاضر از پروسه آنبوردینگ را به
                  صورت کلی انجام داده اند و در سیستم ما شناخته شده هستند.
                  اطلاعات کامل تری از افراد در سیستم پس از آنبوردینگ در اختیار
                  ما قرار دارد.
                </p>
              </Link>
            </CPCard>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Help);
