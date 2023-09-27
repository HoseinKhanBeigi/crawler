import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './LanguageSwitcher.scss';
import CPDropdown from '../CP/CPDropdown';

const localeDict = {
  /* @intl-code-template '${lang}-${COUNTRY}': '${Name}', */
  'en-US': 'English',
  'fa-IR': 'فارسی',
  /* @intl-code-template-end */
};

class LanguageSwitcher extends React.Component {
  render() {
    const { currentLocale, availableLocales } = this.props;
    const localeName = locale => localeDict[locale] || locale;

    const menu = availableLocales
      .filter(locale => locale !== currentLocale)
      .map(locale => ({
        name: localeName(locale),
        value: locale,
        href: `?lang=${locale}`,
        image: `/images/flag/flag_${locale}.png`,
      }));
    return (
      <div className={s.root}>
        <CPDropdown
          linkType="refresh"
          overlay={menu}
          iconType="down"
          title={
            <span>
              <img
                alt={currentLocale}
                className={s.imageLanguage}
                src={`/images/flag/flag_${currentLocale}.png`}
              />
            </span>
          }
        />
      </div>
    );
  }
}

LanguageSwitcher.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  availableLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapState = state => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(LanguageSwitcher));
