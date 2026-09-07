import {
  Wallet,
  ShieldCheck,
  TrendingUp,
  Receipt,
  BarChart3
} from "lucide-react";



function Home({ user, setCurrentPage }) {

  return (
    <div className="home-page">
      <header className="home-header">

        <div className="home-header-container">

          {/* Logo */}

          <div
            className="home-logo"
            onClick={() => setCurrentPage("home")}
          >
          </div>
          </div>
         
      </header>


      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="home-hero-content">

          <div className="home-badge">
            Smart Personal Finance Management
          </div>

          <h1>
            Manage Your Money
            <br />
            <span>Smarter & Easier</span>
          </h1>

          <p>
            Track your income and expenses, understand
            your spending habits, and take control of
            your finances.
          </p>

          <div className="home-buttons">

            <button
              className="home-primary-button"
              onClick={() =>
                setCurrentPage(
                  user ? "dashboard" : "signup"
                )
              }
            >
              Get Started
            </button>

            <button
              className="home-secondary-button"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({
                    behavior: "smooth"
                  })
              }
            >
              Learn More
            </button>

          </div>

        </div>


        {/* Dashboard preview */}

        <div className="home-preview">

          <div className="preview-card">

            <div className="preview-header">
              <h3>Financial Overview</h3>
              <span>This Month</span>
            </div>

            <div className="preview-balance">
              <p>Total Balance</p>
              <h2>₹45,250</h2>
            </div>

            <div className="preview-stats">

              <div className="preview-stat">
                <p>Income</p>
                <strong>₹60,000</strong>
              </div>

              <div className="preview-stat">
                <p>Expenses</p>
                <strong>₹14,750</strong>
              </div>

            </div>

            <div className="preview-chart">

              <div className="preview-chart-title">
                Spending Overview
              </div>

              <div className="chart-bars">
                <div
                  className="chart-bar"
                  style={{ height: "45%" }}
                />

                <div
                  className="chart-bar"
                  style={{ height: "65%" }}
                />

                <div
                  className="chart-bar"
                  style={{ height: "40%" }}
                />

                <div
                  className="chart-bar"
                  style={{ height: "80%" }}
                />

                <div
                  className="chart-bar"
                  style={{ height: "55%" }}
                />

                <div
                  className="chart-bar"
                  style={{ height: "90%" }}
                />

                <div
                  className="chart-bar"
                  style={{ height: "70%" }}
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        className="home-features"
        id="features"
      >

        <div className="home-section-heading">

          <h2>
            Everything You Need
          </h2>

          <p>
            Simple tools to help you manage your
            personal finances.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              <TrendingUp size={21} />
            </div>

            <h3>
              Track Income
            </h3>

            <p>
              Keep track of all your income and
              monitor your financial growth.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              <Receipt size={21} />
            </div>

            <h3>
              Track Expenses
            </h3>

            <p>
              Record your daily expenses and
              understand where your money goes.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              <BarChart3 size={21} />
            </div>

            <h3>
              Expense Analysis
            </h3>

            <p>
              Analyze your spending patterns and
              make better financial decisions.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              <ShieldCheck size={21} />
            </div>

            <h3>
              Secure Account
            </h3>

            <p>
              Your financial information is protected
              with secure authentication.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="home-cta">

        <div className="home-cta-box">

          <h2>
            Take Control of Your Finances
          </h2>

          <p>
            Start tracking your income and expenses
            today and build better financial habits.
          </p>

          <button
            className="home-primary-button"
            onClick={() =>
              setCurrentPage(
                user ? "dashboard" : "signup"
              )
            }
          >
            Get Started
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;