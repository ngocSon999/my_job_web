const Home = () => {
    return (
        <>
            <header className="hero-section bg-white py-5 border-bottom">
                <div className="container-fluid text-center py-5">
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button className="btn btn-primary btn-lg px-5 fw-bold shadow">Bắt đầu miễn phí</button>
                        <button className="btn btn-outline-secondary btn-lg px-5">Tìm hiểu quy chế</button>
                    </div>
                </div>
            </header>

            <section className="features py-5 bg-light">
                <div className="container-fluid">
                    <div className="row g-4 text-center">
                        <div className="col-md-6">
                            <div className="p-4 bg-white rounded shadow-sm h-100">
                                <div className="fs-1 mb-2">⭐</div>
                                <h5 className="fw-bold">Hệ thống Credit</h5>
                                <p className="small text-muted">Mọi hành động đều tích lũy hoặc tiêu tốn điểm uy tín.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-4 bg-white rounded shadow-sm h-100">
                                <div className="fs-1 mb-2">🚫</div>
                                <h5 className="fw-bold">Chặn "Quay xe"</h5>
                                <p className="small text-muted">Khi đã chấp nhận kết nối, thông tin được khóa chặt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;